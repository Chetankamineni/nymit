"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  FoodItem,
  calcCalories,
  calcMacros,
  getPortionGrams,
} from "../../../../lib/indian-food-db";

interface PortionIconProps {
  type: "small_katori" | "large_katori" | "piece" | "multi_piece" | "plate";
  color: string;
  active: boolean;
}

function PortionIcon({ type, color, active }: PortionIconProps) {
  const stroke = active ? color : "currentColor";
  const fill = active ? color + "22" : "transparent";

  if (type === "piece")
    return (
      <svg
        width="32"
        height="36"
        viewBox="0 0 32 36"
        fill="none"
        className="block"
      >
        <rect
          x="6"
          y="8"
          width="20"
          height="20"
          rx="3"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
        <line
          x1="11"
          y1="28"
          x2="9"
          y2="34"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="21"
          y1="28"
          x2="23"
          y2="34"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );

  if (type === "multi_piece")
    return (
      <svg
        width="46"
        height="32"
        viewBox="0 0 46 32"
        fill="none"
        className="block"
      >
        <rect
          x="2"
          y="6"
          width="18"
          height="18"
          rx="3"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
        <rect
          x="26"
          y="6"
          width="18"
          height="18"
          rx="3"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
      </svg>
    );

  if (type === "plate")
    return (
      <svg
        width="52"
        height="36"
        viewBox="0 0 52 36"
        fill="none"
        className="block"
      >
        <path
          d="M4 10 Q4 28 26 28 Q48 28 48 10 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
        <line
          x1="4"
          y1="10"
          x2="48"
          y2="10"
          stroke={stroke}
          strokeWidth="1.5"
        />
        <line
          x1="20"
          y1="28"
          x2="18"
          y2="34"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="28"
          x2="34"
          y2="34"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );

  if (type === "small_katori")
    return (
      <svg
        width="40"
        height="36"
        viewBox="0 0 40 36"
        fill="none"
        className="block"
      >
        <path
          d="M5 12 Q5 28 20 28 Q35 28 35 12 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
        <line
          x1="5"
          y1="12"
          x2="35"
          y2="12"
          stroke={stroke}
          strokeWidth="1.5"
        />
        <line
          x1="16"
          y1="28"
          x2="14"
          y2="34"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="28"
          x2="26"
          y2="34"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );

  // large_katori default
  return (
    <svg
      width="52"
      height="36"
      viewBox="0 0 52 36"
      fill="none"
      className="block"
    >
      <path
        d="M4 10 Q4 28 26 28 Q48 28 48 10 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <line x1="4" y1="10" x2="48" y2="10" stroke={stroke} strokeWidth="1.5" />
      <line
        x1="20"
        y1="28"
        x2="18"
        y2="34"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="28"
        x2="34"
        y2="34"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const PORTION_ICON_MAP: Record<string, PortionIconProps["type"]> = {
  small_katori: "small_katori",
  large_katori: "large_katori",
  cup: "large_katori",
  piece: "piece",
  spoon: "piece",
  katori: "large_katori",
  "2piece": "multi_piece",
  "3piece": "multi_piece",
  "4piece": "multi_piece",
  plate: "plate",
  glass: "large_katori",
  large: "large_katori",
  small: "small_katori",
};

interface PortionPickerProps {
  food: FoodItem;
  portionIdx: number;
  qty: number;
  onPortionChange: (idx: number) => void;
  onQtyChange: (qty: number) => void;
  onAdd: () => void;
}

export function PortionPicker({
  food,
  portionIdx,
  qty,
  onPortionChange,
  onQtyChange,
  onAdd,
}: PortionPickerProps) {
  const calories = calcCalories(food, portionIdx, qty);
  const macros = calcMacros(food, portionIdx, qty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl p-4 space-y-4"
    >
      {/* Food name */}
      <div>
        <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-1">
          Portion size
        </p>
        <p className="text-sm font-medium">{food.name}</p>
      </div>

      {/* Portion buttons */}
      <div className="grid grid-cols-3 gap-2">
        {food.portions.map((p, i) => {
          const iconType = PORTION_ICON_MAP[p.id] ?? "small_katori";
          const isActive = i === portionIdx;
          const sub = p.g ? `${p.g}g` : p.ml ? `${p.ml}ml` : "";
          return (
            <button
              key={p.id}
              onClick={() => onPortionChange(i)}
              className={cn(
                "flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border transition-all",
                isActive
                  ? "border-black/30 dark:border-white/30 bg-neutral-50 dark:bg-neutral-900"
                  : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20",
              )}
            >
              <div className="h-10 flex items-end justify-center">
                <PortionIcon
                  type={iconType}
                  color={food.color}
                  active={isActive}
                />
              </div>
              <span className="text-[12px] font-medium leading-tight text-center">
                {p.label}
              </span>
              {sub && (
                <span className="text-[10px] text-neutral-400 font-mono">
                  {sub}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quantity + calorie preview */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-neutral-500 dark:text-neutral-400 min-w-[56px]">
          Quantity
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onQtyChange(Math.max(0.5, Math.round((qty - 0.5) * 2) / 2))
            }
            className="w-7 h-7 rounded-md border border-black/10 dark:border-white/10 flex items-center justify-center text-base hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-sm font-mono font-medium min-w-[20px] text-center">
            {qty % 1 === 0 ? qty : qty.toFixed(1)}
          </span>
          <button
            onClick={() => onQtyChange(Math.round((qty + 0.5) * 2) / 2)}
            className="w-7 h-7 rounded-md border border-black/10 dark:border-white/10 flex items-center justify-center text-base hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <div className="ml-auto text-right">
          <motion.p
            key={calories}
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl font-bold font-mono leading-none"
          >
            {calories}
          </motion.p>
          <p className="text-[10px] text-neutral-400 mt-0.5">kcal</p>
        </div>
      </div>

      {/* Macro chips */}
      <div className="flex gap-2">
        <span
          className="text-xs px-2.5 py-1 rounded-full font-mono"
          style={{ background: "#f9731618", color: "#c2440a" }}
        >
          P {macros.protein}g
        </span>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-mono"
          style={{ background: "#3b82f618", color: "#1e4fa3" }}
        >
          C {macros.carbs}g
        </span>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-mono"
          style={{ background: "#a855f718", color: "#7c3acd" }}
        >
          F {macros.fat}g
        </span>
      </div>

      {/* Add button */}
      <button
        onClick={onAdd}
        className="w-full h-9 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
      >
        Add to log
      </button>
    </motion.div>
  );
}
