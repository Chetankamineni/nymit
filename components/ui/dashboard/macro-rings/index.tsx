"use client";

import { useEffect, useState } from "react";

interface MacroData {
  protein: { current: number; goal: number };
  carbs: { current: number; goal: number };
  fat: { current: number; goal: number };
  calories: { current: number; goal: number };
  meals: { label: string; kcal: number }[];
  streak: number;
}

const DEMO_DATA: MacroData = {
  protein: { current: 150, goal: 200 },
  carbs: { current: 220, goal: 400 },
  fat: { current: 28, goal: 70 },
  calories: { current: 1840, goal: 2200 },
  meals: [
    { label: "Breakfast", kcal: 420 },
    { label: "Lunch", kcal: 680 },
    { label: "Dinner", kcal: 520 },
    { label: "Snacks", kcal: 220 },
  ],
  streak: 12,
};

const CIRC = 2 * Math.PI * 46;

function Ring({
  pct,
  color,
  label,
  current,
  goal,
  unit = "g",
}: {
  pct: number;
  color: string;
  label: string;
  current: number;
  goal: number;
  unit?: string;
}) {
  const offset = CIRC * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center gap-3 bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl p-4">
      {/* Ring SVG */}
      <div className="relative w-[110px] h-[110px]">
        <svg
          viewBox="0 0 110 110"
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* Track */}
          <circle
            cx="55"
            cy="55"
            r="46"
            strokeWidth="6"
            stroke="currentColor"
            className="text-black/10 dark:text-white/10"
          />
          {/* Progress arc */}
          <circle
            cx="55"
            cy="55"
            r="46"
            strokeWidth="6"
            stroke={color}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            transform="rotate(-90 55 55)"
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span
            className="text-[22px] font-bold font-mono leading-none"
            style={{ color }}
          >
            {Math.round(pct)}%
          </span>
          <span className="text-[10px] font-mono tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
            done
          </span>
        </div>
      </div>

      {/* Label */}
      <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
        {label}
      </span>

      {/* Gram counts */}
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-medium">
          {current}
          {unit}
        </span>
        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
          / {goal}
          {unit}
        </span>
      </div>

      {/* Mini progress bar */}
      <div className="w-full h-[2px] rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function DateBadge() {
  const [label, setLabel] = useState("");
  useEffect(() => {
    const d = new Date();
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    setLabel(
      `${days[d.getDay()]} · ${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]}`,
    );
  }, []);
  return (
    <span className="text-[10px] font-mono tracking-widest px-3 py-1.5 rounded border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 uppercase">
      {label}
    </span>
  );
}

export function MacroProgressRings({ data = DEMO_DATA }: { data?: MacroData }) {
  const { protein, carbs, fat, calories, meals, streak } = data;

  const proteinPct = Math.min((protein.current / protein.goal) * 100, 100);
  const carbsPct = Math.min((carbs.current / carbs.goal) * 100, 100);
  const fatPct = Math.min((fat.current / fat.goal) * 100, 100);
  const calPct = Math.min((calories.current / calories.goal) * 100, 100);
  const calRemaining = calories.goal - calories.current;

  return (
    <div className="w-full space-y-3 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-1">
            Today's fuel log
          </p>
          <p className="text-2xl font-bold tracking-tight">
            Quick-Log Dashboard
          </p>
        </div>
        <DateBadge />
      </div>

      {/* Macro Rings */}
      <div className="grid grid-cols-3 gap-3">
        <Ring
          pct={proteinPct}
          color="#f97316"
          label="Protein"
          current={protein.current}
          goal={protein.goal}
        />
        <Ring
          pct={carbsPct}
          color="#3b82f6"
          label="Carbs"
          current={carbs.current}
          goal={carbs.goal}
        />
        <Ring
          pct={fatPct}
          color="#a855f7"
          label="Fat"
          current={fat.current}
          goal={fat.goal}
        />
      </div>

      {/* Calories card */}
      <div className="flex items-center justify-between gap-6 bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl p-5">
        <div className="shrink-0">
          <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-1">
            Calories
          </p>
          <p className="text-4xl font-bold font-mono leading-none">
            {calories.current.toLocaleString()}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
            <span className="text-black dark:text-white font-medium">
              {calRemaining}
            </span>{" "}
            remaining · goal {calories.goal.toLocaleString()}
          </p>
        </div>

        <div className="flex-1 max-w-xs">
          <div className="flex justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(calPct)}%</span>
          </div>
          <div className="h-1 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden mb-4">
            <div
              className="h-full rounded-full bg-black dark:bg-white transition-all duration-700"
              style={{ width: `${calPct}%` }}
            />
          </div>
          {/* Mini macro bars */}
          <div className="flex gap-2">
            {[
              { label: "Prot", pct: proteinPct, color: "#f97316" },
              { label: "Carbs", pct: carbsPct, color: "#3b82f6" },
              { label: "Fat", pct: fatPct, color: "#a855f7" },
            ].map(({ label, pct, color }) => (
              <div key={label} className="flex-1 text-center">
                <div className="h-7 flex items-end mb-1">
                  <div
                    className="w-full rounded-t-sm opacity-80"
                    style={{
                      height: `${Math.max(pct * 0.8, 8)}%`,
                      background: color,
                      minHeight: "4px",
                    }}
                  />
                </div>
                <span className="text-[9px] font-mono tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Meal breakdown */}
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl p-4">
          <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-3">
            Meal breakdown
          </p>
          <div className="space-y-2">
            {meals.map(({ label, kcal }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {label}
                </span>
                <span className="text-sm font-mono font-medium">
                  {kcal} kcal
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl p-4">
          <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-2">
            Log streak
          </p>
          <p className="text-5xl font-bold font-mono leading-none">{streak}</p>
          <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-1 mb-3">
            days in a row
          </p>
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => {
              const isToday = i === 6;
              const isActive = i < 7;
              return (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    isToday
                      ? "ring-2 ring-offset-2 ring-black dark:ring-white ring-offset-neutral-100 dark:ring-offset-neutral-900 bg-black dark:bg-white"
                      : isActive
                        ? "bg-black dark:bg-white"
                        : "bg-black/10 dark:bg-white/10"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
