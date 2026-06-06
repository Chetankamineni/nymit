"use client";

import { useState } from "react";
import { Meal, FoodItem } from "./types";
import { DEFAULT_MEALS } from "./constants";
import { MealCard } from "./meal-card";

// Re-export shared primitives to prevent import breaks across the app
export type { Meal, FoodItem };
export { DEFAULT_MEALS };

interface MealSlotsProps {
  initialMeals?: Meal[];
  meals?: Meal[];
  onMealsChange?: (meals: Meal[]) => void;
  onScanClick?: (mealId: string) => void;
}

export function MealSlots({
  initialMeals = DEFAULT_MEALS,
  meals: mealsProp,
  onMealsChange,
  onScanClick,
}: MealSlotsProps) {
  const [mealsState, setMealsState] = useState<Meal[]>(initialMeals);
  const isControlled = mealsProp !== undefined;
  const meals = mealsProp ?? mealsState;

  const updateMeals = (nextMeals: Meal[]) => {
    if (isControlled) {
      onMealsChange?.(nextMeals);
    } else {
      setMealsState(nextMeals);
    }
  };

  const addItem = (mealId: string, item: FoodItem) => {
    updateMeals(
      meals.map((m) =>
        m.id === mealId ? { ...m, items: [...m.items, item] } : m,
      ),
    );
  };

  const removeItem = (mealId: string, index: number) => {
    updateMeals(
      meals.map((m) =>
        m.id === mealId
          ? { ...m, items: m.items.filter((_, i) => i !== index) }
          : m,
      ),
    );
  };

  const grandTotal = meals.reduce(
    (s, m) => s + m.items.reduce((ss, i) => ss + i.cal, 0),
    0,
  );

  return (
    <div className="w-full space-y-3">
      <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
        Meal log
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            onAdd={addItem}
            onRemove={removeItem}
            onScanClick={onScanClick ?? (() => {})}
          />
        ))}
      </div>

      {/* Grand total summary panel */}
      <div className="flex justify-between items-center pt-3 border-t border-black/10 dark:border-white/10">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
          Total logged today
        </span>
        <span className="text-sm font-mono font-medium">
          {grandTotal.toLocaleString()} kcal
        </span>
      </div>
    </div>
  );
}
