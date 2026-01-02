"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Activity, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function ListItem({ icon, label, isActive }: ListItemProps) {
  return (
    <motion.div
      animate={{
        backgroundColor: isActive
          ? "rgba(245, 245, 245, 1)"
          : "rgba(255, 255, 255, 0)",
        scale: isActive ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
      className="group flex items-center justify-between p-3 rounded-xl transition-colors cursor-default"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "transition-colors duration-300",
            isActive
              ? "text-black dark:text-white"
              : "text-neutral-500 dark:text-neutral-400"
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            isActive
              ? "text-black dark:text-white font-semibold"
              : "text-neutral-700 dark:text-neutral-300"
          )}
        >
          {label}
        </span>
      </div>
      {isActive && (
        <motion.div
          layoutId="active-dot"
          className="w-2 h-2 rounded-full bg-black dark:bg-white"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
}

export function SaveCollectionsCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 1500); // Switch every 1.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full p-6 bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1">Health Snapshot</h3>
        <p className="text-sm text-neutral-500">
          Track every aspect of your physical journey in one place.
        </p>
      </div>

      <div className="w-full bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-2 shadow-sm">
        <div className="px-3 py-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
          Metrics
        </div>
        <ListItem
          icon={<Dumbbell className="w-5 h-5" />}
          label="Workouts"
          isActive={activeIndex === 0}
        />
        <ListItem
          icon={<Activity className="w-5 h-5" />}
          label="Health Tracking"
          isActive={activeIndex === 1}
        />
        <ListItem
          icon={<Flame className="w-5 h-5" />}
          label="Calories"
          isActive={activeIndex === 2}
        />
        <ListItem
          icon={<Trophy className="w-5 h-5" />}
          label="Streak"
          isActive={activeIndex === 3}
        />
      </div>
    </div>
  );
}
