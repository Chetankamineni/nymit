import { Meal } from "./types";

export const DEFAULT_MEALS: Meal[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    icon: "🌅",
    color: "#f97316",
    calorieGoal: 700,
    items: [],
  },
  {
    id: "lunch",
    name: "Lunch",
    icon: "☀️",
    color: "#3b82f6",
    calorieGoal: 900,
    items: [],
  },
  {
    id: "snack",
    name: "Snack",
    icon: "⚡",
    color: "#a855f7",
    calorieGoal: 400,
    items: [],
  },
  {
    id: "dinner",
    name: "Dinner",
    icon: "🌙",
    color: "#10b981",
    calorieGoal: 800,
    items: [],
  },
];
