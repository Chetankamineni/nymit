"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Plus } from "lucide-react";
import { Meal, FoodItem } from "./types";
import { FoodItemRow } from "./food-item-row";

interface MealCardProps {
  meal: Meal;
  onAdd: (mealId: string, item: FoodItem) => void;
  onRemove: (mealId: string, index: number) => void;
  onScanClick: (mealId: string) => void;
}

// Inline helper to parse quick text inputs (e.g., "Egg 150 kcal")
function parseFoodInput(raw: string): FoodItem {
  const calMatch = raw.match(/(\d+)\s*kcal?$/i);
  if (calMatch) {
    return {
      name: raw.replace(/\s*\d+\s*kcal?$/i, "").trim() || raw,
      cal: parseInt(calMatch[1]),
    };
  }
  // Fallback to a random structural range if no calories are specified
  return { name: raw.trim(), cal: Math.round(150 + Math.random() * 200) };
}

export function MealCard({
  meal,
  onAdd,
  onRemove,
  onScanClick,
}: MealCardProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Compute metrics local to this card context
  const total = meal.items.reduce((s, i) => s + i.cal, 0);
  const pct = Math.min((total / meal.calorieGoal) * 100, 100);

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(meal.id, parseFoodInput(input));
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex flex-col gap-3 bg-white dark:bg-neutral-950 border rounded-xl p-4 transition-colors ${
        meal.items.length > 0
          ? "border-black/20 dark:border-white/20"
          : "border-black/10 dark:border-white/10"
      }`}
    >
      {/* Header Container */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
            style={{ background: meal.color + "18" }}
          >
            {meal.icon}
          </div>
          <span className="text-sm font-medium">{meal.name}</span>
        </div>
        <span
          className={`text-xs font-mono ${
            total > 0 ? "text-black dark:text-white" : "text-neutral-400"
          }`}
        >
          {total > 0 ? `${total} kcal` : "— kcal"}
        </span>
      </div>

      {/* Food Items Animation Wrapper */}
      <AnimatePresence initial={false}>
        {meal.items.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {meal.items.map((item, idx) => (
                <FoodItemRow
                  key={idx}
                  item={item}
                  index={idx}
                  mealId={meal.id}
                  onRemove={onRemove}
                />
              ))}
            </div>

            {/* Dynamic Progress Bar */}
            <div className="mt-2 h-[3px] rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: meal.color }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Row Action Panel */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add food…"
          className="flex-1 h-8 text-xs px-3 rounded-lg border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
        />
        <button
          onClick={handleAdd}
          aria-label="Add item"
          className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onScanClick(meal.id)}
          className="h-8 px-2.5 rounded-lg border border-black/10 dark:border-white/10 flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <Camera className="w-3.5 h-3.5" />
          Scan
        </button>
      </div>
    </div>
  );
}
