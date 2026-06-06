"use client";

import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

export type DayStatus = "success" | "warning" | "miss" | "future";

export interface StreakDay {
  date: string; // ISO date string e.g. "2026-06-01"
  status: DayStatus;
  calories?: number;
  goal?: number;
}

interface ConsistencyStreakProps {
  currentStreak: number;
  bestStreak: number;
  averageDeficit: number;
  days: StreakDay[]; // last 28 days, most recent last
  weekDays: StreakDay[]; // last 7 days for the detailed row
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeekDot({ day, label }: { day: StreakDay; label: string }) {
  const isToday = day.status !== "future" && label === "Sun"; // caller sets this
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] font-mono uppercase text-neutral-400">
        {label}
      </span>
      <div
        className={cn(
          "w-full aspect-square rounded border flex items-center justify-center",
          day.status === "success" && "bg-[#EAF3DE] border-[#97C459]",
          day.status === "warning" && "bg-[#FAEEDA] border-[#EF9F27]",
          day.status === "miss" &&
            "bg-neutral-100 dark:bg-neutral-800 border-black/10 dark:border-white/10",
          day.status === "future" &&
            "opacity-30 bg-neutral-100 dark:bg-neutral-800 border-black/10 dark:border-white/10",
        )}
      >
        {day.status === "success" && (
          <Check className="w-3 h-3 text-[#3B6D11]" strokeWidth={2.5} />
        )}
        {day.status === "warning" && (
          <Minus className="w-3 h-3 text-[#854F0B]" strokeWidth={2.5} />
        )}
        {(day.status === "miss" || day.status === "future") && (
          <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
        )}
      </div>
      <span className="text-[9px] font-mono text-neutral-400">
        {day.calories ?? ""}
      </span>
    </div>
  );
}

function HeatDot({ status }: { status: DayStatus }) {
  return (
    <div
      className={cn(
        "aspect-square rounded-[3px]",
        status === "success" && "bg-[#EAF3DE]",
        status === "warning" && "bg-[#FAEEDA]",
        status === "miss" &&
          "bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10",
        status === "future" && "opacity-25 bg-neutral-100 dark:bg-neutral-900",
      )}
    />
  );
}

function StreakBadge({ streak, goal = 7 }: { streak: number; goal?: number }) {
  if (streak >= goal)
    return (
      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#EAF3DE] text-[#27500A]">
        On track
      </span>
    );
  if (streak >= 3)
    return (
      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#FAEEDA] text-[#633806]">
        Building
      </span>
    );
  return (
    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#FCEBEB] text-[#791F1F]">
      Restart
    </span>
  );
}

export function ConsistencyStreak({
  currentStreak,
  bestStreak,
  averageDeficit,
  days,
  weekDays,
}: ConsistencyStreakProps) {
  const onTrackCount = days.filter((d) => d.status === "success").length;

  return (
    <div className="w-full bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl p-4 space-y-4">
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-mono leading-none">
              {currentStreak}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              day streak
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Calories within goal every day
          </p>
        </div>
        <StreakBadge streak={currentStreak} />
      </div>

      {/* 7-day detail grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((day, i) => (
          <WeekDot key={day.date} day={day} label={DAY_LABELS[i]} />
        ))}
      </div>

      {/* 28-day heatmap */}
      <div>
        <div className="grid grid-cols-14 gap-1 mb-2">
          {days.map((day) => (
            <HeatDot key={day.date} status={day.status} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4">
          {[
            {
              label: "Within goal",
              cls: "bg-[#EAF3DE] border border-[#97C459]",
            },
            {
              label: "Slightly over",
              cls: "bg-[#FAEEDA] border border-[#EF9F27]",
            },
            {
              label: "Missed",
              cls: "bg-neutral-100 dark:bg-neutral-800 border border-black/10 dark:border-white/10",
            },
          ].map(({ label, cls }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-[3px] ${cls}`} />
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Best streak", value: bestStreak, sub: "days" },
          { label: "This month", value: onTrackCount, sub: "days on track" },
          {
            label: "Avg. deficit",
            value:
              averageDeficit > 0
                ? `−${averageDeficit}`
                : `+${Math.abs(averageDeficit)}`,
            sub: "kcal / day",
          },
        ].map(({ label, value, sub }) => (
          <div
            key={label}
            className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3"
          >
            <p className="text-[10px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-1">
              {label}
            </p>
            <p className="text-xl font-bold font-mono leading-none">{value}</p>
            <p className="text-[10px] text-neutral-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Helper to build demo / real data ────────────────────────────────────────

export function buildStreakDays(
  calGoal: number,
  rawDays: { date: string; calories: number | null }[],
): StreakDay[] {
  return rawDays.map(({ date, calories }) => {
    if (calories === null) return { date, status: "future" };
    if (calories <= calGoal)
      return { date, status: "success", calories, goal: calGoal };
    if (calories <= calGoal * 1.1)
      return { date, status: "warning", calories, goal: calGoal };
    return { date, status: "miss", calories, goal: calGoal };
  });
}
