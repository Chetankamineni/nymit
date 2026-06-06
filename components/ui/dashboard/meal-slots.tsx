"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, Plus, X } from "lucide-react";
import { useRef, useState } from "react";

export interface FoodItem {
  name: string;
  cal: number;
}

export interface Meal {
  id: string;
  name: string;
  icon: string;
  color: string;
  calorieGoal: number;
  items: FoodItem[];
}

const DEFAULT_MEALS: Meal[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    icon: "🌅",
    color: "#f97316",
    calorieGoal: 700,
    items: [],
  },
  {
    id: "lunch",
    name: "Lunch",
    icon: "☀️",
    color: "#3b82f6",
    calorieGoal: 900,
    items: [],
  },
  {
    id: "snack",
    name: "Snack",
    icon: "⚡",
    color: "#a855f7",
    calorieGoal: 400,
    items: [],
  },
  {
    id: "dinner",
    name: "Dinner",
    icon: "🌙",
    color: "#10b981",
    calorieGoal: 800,
    items: [],
  },
];

function parseFoodInput(raw: string): FoodItem {
  const calMatch = raw.match(/(\d+)\s*kcal?$/i);
  if (calMatch) {
    return {
      name: raw.replace(/\s*\d+\s*kcal?$/i, "").trim() || raw,
      cal: parseInt(calMatch[1]),
    };
  }
  return { name: raw.trim(), cal: Math.round(150 + Math.random() * 200) };
}

interface MealCardProps {
  meal: Meal;
  onAdd: (mealId: string, item: FoodItem) => void;
  onRemove: (mealId: string, index: number) => void;
  onScanClick: (mealId: string) => void;
}

function MealCard({ meal, onAdd, onRemove, onScanClick }: MealCardProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
      {/* Header */}
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

      {/* Food items */}
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
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-900"
                >
                  <span className="text-xs text-black dark:text-white">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500">
                      {item.cal}
                    </span>
                    <button
                      onClick={() => onRemove(meal.id, idx)}
                      className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
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

      {/* Add row */}
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

interface MealSlotsProps {
  initialMeals?: Meal[];
  onScanClick?: (mealId: string) => void;
}

export function MealSlots({
  initialMeals = DEFAULT_MEALS,
  onScanClick,
}: MealSlotsProps) {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);

  const addItem = (mealId: string, item: FoodItem) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === mealId ? { ...m, items: [...m.items, item] } : m,
      ),
    );
  };

  const removeItem = (mealId: string, index: number) => {
    setMeals((prev) =>
      prev.map((m) =>
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

      {/* Grand total */}
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
