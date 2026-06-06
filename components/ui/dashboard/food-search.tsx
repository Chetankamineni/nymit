"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  FOOD_CATEGORIES,
  FoodItem,
  calcCalories,
  calcMacros,
  searchFoods,
} from "./indian-food-db";
import { PortionPicker } from "./portion-picker";

export interface LoggedEntry {
  id: string;
  foodName: string;
  portionLabel: string;
  qty: number;
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
  color: string;
}

interface FoodSearchProps {
  onAddEntry?: (entry: LoggedEntry) => void;
  mealId?: string;
}

export function FoodSearch({ onAddEntry, mealId }: FoodSearchProps) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [portionIdx, setPortionIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [log, setLog] = useState<LoggedEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchFoods(query, activeCat).slice(0, 12);

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setPortionIdx(0);
    setQty(1);
  };

  const handleAdd = () => {
    if (!selectedFood) return;
    const macros = calcMacros(selectedFood, portionIdx, qty);
    const cal = calcCalories(selectedFood, portionIdx, qty);
    const portion = selectedFood.portions[portionIdx];
    const entry: LoggedEntry = {
      id: Date.now().toString(),
      foodName: selectedFood.name,
      portionLabel: `${portion.label}${qty !== 1 ? ` ×${qty % 1 === 0 ? qty : qty.toFixed(1)}` : ""}`,
      qty,
      cal,
      color: selectedFood.color,
      ...macros,
    };
    setLog((prev) => [...prev, entry]);
    onAddEntry?.(entry);
    setSelectedFood(null);
    setQuery("");
    inputRef.current?.focus();
  };

  const removeEntry = (id: string) =>
    setLog((prev) => prev.filter((e) => e.id !== id));

  const totalCal = log.reduce((s, e) => s + e.cal, 0);

  return (
    <div className="w-full space-y-3">
      {/* Search card */}
      <div className="bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl p-4 space-y-3">
        <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
          Food search
        </p>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dal, roti, paneer…"
            className="w-full h-10 pl-9 pr-4 text-sm rounded-lg border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-1.5 flex-wrap">
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={cn(
                "px-3 py-1 text-[11px] rounded-full border transition-colors",
                activeCat === cat
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "border-black/10 dark:border-white/10 text-neutral-500 hover:border-black/20 dark:hover:border-white/20",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-0.5 max-h-56 overflow-y-auto">
          {results.length === 0 ? (
            <p className="py-5 text-center text-sm text-neutral-400">
              No items found — try a different search.
            </p>
          ) : (
            results.map((food) => (
              <button
                key={food.name}
                onClick={() => handleSelectFood(food)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 rounded-lg text-left transition-colors",
                  selectedFood?.name === food.name
                    ? "bg-neutral-100 dark:bg-neutral-800"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-900",
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
                    style={{ background: food.color + "18", color: food.color }}
                  >
                    {food.cat}
                  </span>
                  <span className="text-sm truncate">{food.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-mono">{food.calPer100}</p>
                    <p className="text-[10px] text-neutral-400">per 100g</p>
                  </div>
                  <div className="w-6 h-6 rounded-md border border-black/10 dark:border-white/10 flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Portion picker */}
      <AnimatePresence>
        {selectedFood && (
          <PortionPicker
            food={selectedFood}
            portionIdx={portionIdx}
            qty={qty}
            onPortionChange={(i) => {
              setPortionIdx(i);
              setQty(1);
            }}
            onQtyChange={setQty}
            onAdd={handleAdd}
          />
        )}
      </AnimatePresence>

      {/* Log */}
      <AnimatePresence>
        {log.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl p-4 space-y-2"
          >
            <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
              {mealId ? `${mealId} log` : "Today's log"}
            </p>
            <div className="flex flex-col gap-1.5">
              {log.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  className="flex items-center justify-between px-3 py-2 bg-neutral-50 dark:bg-neutral-900 rounded-lg"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: entry.color }}
                    />
                    <span className="text-xs truncate">{entry.foodName}</span>
                    <span className="text-[10px] text-neutral-400 shrink-0">
                      {entry.portionLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <span className="text-xs font-mono text-neutral-500">
                      {entry.cal} kcal
                    </span>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                      aria-label={`Remove ${entry.foodName}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between pt-2 border-t border-black/10 dark:border-white/10">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                Total
              </span>
              <span className="text-sm font-mono font-medium">
                {totalCal.toLocaleString()} kcal
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
