"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const WATER_GOAL = 8;

const STATUS_MESSAGES: Record<number, string> = {
  0: "Start logging",
  1: "Good start!",
  2: "Keep going!",
  3: "Half way there!",
  4: "Half way there!",
  5: "Great progress!",
  6: "Almost done!",
  7: "One more glass!",
  8: "Goal reached!",
};

interface HydrationTrackerProps {
  goal?: number;
  initialCount?: number;
  onUpdate?: (count: number) => void;
}

export function HydrationTracker({
  goal = WATER_GOAL,
  initialCount = 0,
  onUpdate,
}: HydrationTrackerProps) {
  const [count, setCount] = useState(initialCount);

  const update = (next: number) => {
    const clamped = Math.max(0, Math.min(goal, next));
    setCount(clamped);
    onUpdate?.(clamped);
  };

  const status = STATUS_MESSAGES[Math.min(count, goal)] ?? "Goal reached!";
  const pct = Math.round((count / goal) * 100);

  return (
    <div className="w-full bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl p-4">
      <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-4">
        Hydration
      </p>

      <div className="flex items-center gap-5">
        {/* Count + status */}
        <div className="flex flex-col shrink-0 min-w-[80px]">
          <motion.span
            key={count}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold font-mono leading-none"
          >
            {count}
          </motion.span>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
            / {goal} glasses
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            {status}
          </span>
        </div>

        {/* Glass grid */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {Array.from({ length: goal }).map((_, i) => {
            const filled = i < count;
            return (
              <button
                key={i}
                onClick={() => update(filled ? i : i + 1)}
                aria-label={`${filled ? "Remove" : "Log"} glass ${i + 1}`}
                className="relative w-7 h-9 rounded-t-sm rounded-b-md border-[1.5px] overflow-hidden transition-colors"
                style={{
                  borderColor: filled
                    ? "#3b82f6"
                    : "var(--color-border-secondary)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bottom-0"
                  style={{ background: "#3b82f6", opacity: 0.65 }}
                  initial={false}
                  animate={{ height: filled ? "100%" : "0%" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </button>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={() => update(count + 1)}
            className="h-8 px-4 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:opacity-80 transition-opacity"
          >
            + Glass
          </button>
          <button
            onClick={() => update(count - 1)}
            className="h-8 px-4 rounded-lg border border-black/10 dark:border-white/10 text-xs text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Undo
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-[3px] rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-blue-500"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] font-mono text-neutral-400">0</span>
        <span className="text-[10px] font-mono text-neutral-400">{pct}%</span>
        <span className="text-[10px] font-mono text-neutral-400">{goal}</span>
      </div>
    </div>
  );
}
