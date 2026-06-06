"use client";

import { HydrationTracker } from "@/components/ui/dashboard/hydration-tracker";
import { MacroProgressRings } from "@/components/ui/dashboard/macro-rings";
import { MealSlots } from "@/components/ui/dashboard/meal-slots";
import { ThemeToggle } from "@/components/ui/hero-section/theme-toggle";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleScanClick = (mealId: string) => {
    // Wire to your Vision Upload flow here
    console.log("Vision upload triggered for:", mealId);
    // e.g. router.push(`/dashboard/scan?meal=${mealId}`);
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-black text-black dark:text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <div className="w-4 h-4 bg-black dark:bg-white" />
            nymit
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-500 hidden sm:block">
              Dashboard
            </span>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        {/* Macro rings */}
        <MacroProgressRings />

        {/* Meal slots */}
        <MealSlots onScanClick={handleScanClick} />

        {/* Hydration */}
        <HydrationTracker goal={8} initialCount={0} />
      </div>
    </main>
  );
}
