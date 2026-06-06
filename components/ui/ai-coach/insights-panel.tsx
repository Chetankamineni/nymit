"use client";

import {
  CoachAlerts,
  FoodLogSummary,
  deriveAlerts,
} from "@/components/ui/ai-coach/coach-alerts";
import {
  ConsistencyStreak,
  StreakDay,
  buildStreakDays,
} from "@/components/ui/ai-coach/consistency-streak";

// ─── Demo data ────────────────────────────────────────────────────────────────

const DEMO_SUMMARY: FoodLogSummary = {
  totalSodiumMg: 680,
  totalCalories: 1840,
  hasUltraProcessed: false,
  hasFried: true,
  hasDahi: true,
  hasLowFatMeal: false,
};

const DEMO_RAW_DAYS = [
  { date: "2026-05-10", calories: 2140 },
  { date: "2026-05-11", calories: 1980 },
  { date: "2026-05-12", calories: 2210 },
  { date: "2026-05-13", calories: 2050 },
  { date: "2026-05-14", calories: 1920 },
  { date: "2026-05-15", calories: 2380 },
  { date: "2026-05-16", calories: 1870 },
  { date: "2026-05-17", calories: null },
  { date: "2026-05-18", calories: 2010 },
  { date: "2026-05-19", calories: 2190 },
  { date: "2026-05-20", calories: 1960 },
  { date: "2026-05-21", calories: 2060 },
  { date: "2026-05-22", calories: 2140 },
  { date: "2026-05-23", calories: 2050 },
  { date: "2026-05-24", calories: 2350 },
  { date: "2026-05-25", calories: 1910 },
  { date: "2026-05-26", calories: 2030 },
  { date: "2026-05-27", calories: 2100 },
  { date: "2026-05-28", calories: 2200 },
  { date: "2026-05-29", calories: 1850 },
  { date: "2026-05-30", calories: 2080 },
  { date: "2026-05-31", calories: 2000 },
  { date: "2026-06-01", calories: 2170 },
  { date: "2026-06-02", calories: 1940 },
  { date: "2026-06-03", calories: 2060 },
  { date: "2026-06-04", calories: 1990 },
  { date: "2026-06-05", calories: 2120 },
  { date: "2026-06-06", calories: null },
];

const CALORIE_GOAL = 2200;

// ─── Component ────────────────────────────────────────────────────────────────

interface InsightPanelProps {
  foodSummary?: FoodLogSummary;
  calorieGoal?: number;
  currentStreak?: number;
  bestStreak?: number;
  averageDeficit?: number;
  rawDays?: { date: string; calories: number | null }[];
  onCoachPrompt?: (prompt: string) => void;
}

export function InsightPanel({
  foodSummary = DEMO_SUMMARY,
  calorieGoal = CALORIE_GOAL,
  currentStreak = 12,
  bestStreak = 19,
  averageDeficit = 142,
  rawDays = DEMO_RAW_DAYS,
  onCoachPrompt,
}: InsightPanelProps) {
  const alerts = deriveAlerts(foodSummary, onCoachPrompt);

  const allDays: StreakDay[] = buildStreakDays(calorieGoal, rawDays);
  const weekDays: StreakDay[] = allDays.slice(-7);

  return (
    <div className="w-full space-y-3">
      {/* Dynamic health alerts — only renders when alerts exist */}
      {alerts.length > 0 && <CoachAlerts alerts={alerts} />}

      {/* Consistency streak calendar */}
      <ConsistencyStreak
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        averageDeficit={averageDeficit}
        days={allDays}
        weekDays={weekDays}
      />
    </div>
  );
}
