"use client";

import React from "react";
import { InsightPanel } from "@/components/ui/ai-coach/insights-panel";
import { CoachAlerts } from "@/components/ui/ai-coach/coach-alerts";
import { ConsistencyStreak } from "@/components/ui/ai-coach/consistency-streak";
import { ThemeToggle } from "@/components/ui/hero-section/theme-toggle";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AICoachPage() {
  const router = useRouter();

  const handleCoachPrompt = (prompt: string) => {
    console.log("Coach action clicked with prompt:", prompt);
    // Handle your AI chatbot navigation or state injection here
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-black text-black dark:text-white">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <div className="w-4 h-4 bg-black dark:bg-white" />
            nymit
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-500 hidden sm:block">
              AI Coach
            </span>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Coach</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Real-time dietary feedback and consistency tracking.
          </p>
        </div>

        <hr className="border-neutral-200 dark:border-neutral-800" />

        {/* Layout Grid: Left side for alerts & insights, Right side for streaks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <CoachAlerts alerts={[]} />

            {/* Insight Panel Layout Container */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
              <InsightPanel onCoachPrompt={handleCoachPrompt} />
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Added: Consistency Streak Component */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
              <ConsistencyStreak
                currentStreak={0}
                bestStreak={0}
                averageDeficit={0}
                days={[]}
                weekDays={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
