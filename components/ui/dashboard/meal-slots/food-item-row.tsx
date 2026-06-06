"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FoodItem } from "./types";

interface FoodItemRowProps {
  item: FoodItem;
  index: number;
  mealId: string;
  onRemove: (mealId: string, index: number) => void;
}

export function FoodItemRow({
  item,
  index,
  mealId,
  onRemove,
}: FoodItemRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-900"
    >
      <span className="text-xs text-black dark:text-white">{item.name}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-neutral-500">{item.cal}</span>
        <button
          onClick={() => onRemove(mealId, index)}
          className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          aria-label={`Remove ${item.name}`}
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}
