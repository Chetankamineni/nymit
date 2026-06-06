import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { prisma } from "@/lib/prisma";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(req: NextRequest) {
  try {
    const { userInput, userId } = await req.json(); // Fallback to a mock user ID for testing V1 if auth isn't wired yet

    if (!userInput || !userInput.trim()) {
      return NextResponse.json(
        { error: "Empty meal payload received" },
        { status: 400 },
      );
    }

    // 1. Structural Linguistic Parsing Strategy (Gemini)
    const mealParserSchema = {
      type: Type.OBJECT,
      properties: {
        items: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              standardized_slug: { type: Type.STRING },
              quantity: { type: Type.NUMBER },
            },
            required: ["standardized_slug", "quantity"],
          },
        },
        needs_clarification: { type: Type.BOOLEAN },
        clarification_message: { type: Type.STRING },
      },
      required: ["items", "needs_clarification"],
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse this food log input string: "${userInput}".`,
      config: {
        systemInstruction:
          "Extract food base singular slugs and quantities from the multilingual Indian text input. Do not evaluate nutrition metrics.",
        responseMimeType: "application/json",
        responseSchema: mealParserSchema,
        temperature: 0.0,
      },
    });

    const parsedPayload = JSON.parse(response.text || "{}");

    if (parsedPayload.needs_clarification) {
      return NextResponse.json({
        success: false,
        step: "clarify",
        message: parsedPayload.clarification_message,
      });
    }

    // 2. Deterministic Pure Database Lookup via Prisma
    let totalMealCalories = 0;
    let totalMealProtein = 0;
    let totalMealCarbs = 0;
    let totalMealFats = 0;
    let totalMealFiber = 0;
    const finalLoggedItems = [];

    for (const item of parsedPayload.items) {
      const foodData = await prisma.foodDictionary.findUnique({
        where: { searchSlug: item.standardized_slug },
      });

      if (foodData) {
        const qty = item.quantity || 1;

        totalMealCalories += Math.round(foodData.calories * qty);
        totalMealProtein += Number(foodData.proteinG) * qty;
        totalMealCarbs += Number(foodData.carbsG) * qty;
        totalMealFats += Number(foodData.fatsG) * qty;
        totalMealFiber += Number(foodData.fiberG) * qty;

        finalLoggedItems.push({
          name: foodData.displayName,
          quantity: qty,
          unit: foodData.servingUnit,
        });
      }
    }

    // 3. Acceleration Insight Calculation
    const TARGETS = { protein: 80, fiber: 30 };
    const proteinShortage = TARGETS.protein - totalMealProtein;
    let coachActionableInsight =
      "Discipline looks solid. Keep tracking your standard meal intervals.";

    if (proteinShortage > 0) {
      const curdWeightNeeded = Math.round(proteinShortage * 0.6 * 16.6); // 6g per 100g
      const paneerWeightNeeded = Math.round(proteinShortage * 0.4 * 5.5); // 18g per 100g
      coachActionableInsight = `You are short by ${Math.round(proteinShortage)}g of your protein target. Add roughly ${curdWeightNeeded}g of Curd or ${paneerWeightNeeded}g of Paneer later today to hit your goal.`;
    }

    // 4. Async Log persistence execution block
    const computedMacros = {
      calories: totalMealCalories,
      protein: Number(totalMealProtein.toFixed(1)),
      carbs: Number(totalMealCarbs.toFixed(1)),
      fats: Number(totalMealFats.toFixed(1)),
      fiber: Number(totalMealFiber.toFixed(1)),
    };

    if (userId) {
      await prisma.mealLog.create({
        data: {
          userId: userId,
          userInput: userInput,
          macrosInfo: computedMacros,
        },
      });
    }

    return NextResponse.json({
      success: true,
      step: "logged",
      loggedItems: finalLoggedItems,
      macros: computedMacros,
      magic_insight: coachActionableInsight,
    });
  } catch (error: any) {
    console.error("Prisma Core Pipeline Failure:", error);
    return NextResponse.json(
      { error: "Data computation breakdown" },
      { status: 500 },
    );
  }
}
