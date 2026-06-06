export interface PortionOption {
  id: string;
  label: string;
  g?: number;
  ml?: number;
}

export interface FoodItem {
  name: string;
  cat: string;
  color: string;
  calPer100: number;
  protein: number;
  carbs: number;
  fat: number;
  portions: PortionOption[];
}

export const INDIAN_FOOD_DB: FoodItem[] = [
  {
    name: "Dal tadka",
    cat: "Dal",
    color: "#f97316",
    calPer100: 116,
    protein: 7,
    carbs: 18,
    fat: 2,
    portions: [
      { id: "small_katori", label: "Small katori", ml: 150 },
      { id: "large_katori", label: "Large katori", ml: 250 },
      { id: "cup", label: "Cup", ml: 200 },
    ],
  },
  {
    name: "Dal makhani",
    cat: "Dal",
    color: "#f97316",
    calPer100: 130,
    protein: 6,
    carbs: 17,
    fat: 4,
    portions: [
      { id: "small_katori", label: "Small katori", ml: 150 },
      { id: "large_katori", label: "Large katori", ml: 250 },
      { id: "cup", label: "Cup", ml: 200 },
    ],
  },
  {
    name: "Chana dal",
    cat: "Dal",
    color: "#f97316",
    calPer100: 120,
    protein: 8,
    carbs: 19,
    fat: 1,
    portions: [
      { id: "small_katori", label: "Small katori", ml: 150 },
      { id: "large_katori", label: "Large katori", ml: 250 },
      { id: "cup", label: "Cup", ml: 200 },
    ],
  },
  {
    name: "Moong dal",
    cat: "Dal",
    color: "#f97316",
    calPer100: 105,
    protein: 7,
    carbs: 15,
    fat: 1,
    portions: [
      { id: "small_katori", label: "Small katori", ml: 150 },
      { id: "large_katori", label: "Large katori", ml: 250 },
      { id: "cup", label: "Cup", ml: 200 },
    ],
  },
  {
    name: "Phulka roti",
    cat: "Roti",
    color: "#eab308",
    calPer100: 297,
    protein: 8,
    carbs: 60,
    fat: 2,
    portions: [
      { id: "piece", label: "1 piece", g: 30 },
      { id: "2piece", label: "2 pieces", g: 60 },
      { id: "3piece", label: "3 pieces", g: 90 },
    ],
  },
  {
    name: "Paratha (plain)",
    cat: "Roti",
    color: "#eab308",
    calPer100: 326,
    protein: 7,
    carbs: 52,
    fat: 10,
    portions: [
      { id: "piece", label: "1 piece", g: 80 },
      { id: "2piece", label: "2 pieces", g: 160 },
      { id: "3piece", label: "3 pieces", g: 240 },
    ],
  },
  {
    name: "Chapati",
    cat: "Roti",
    color: "#eab308",
    calPer100: 297,
    protein: 8,
    carbs: 60,
    fat: 2,
    portions: [
      { id: "piece", label: "1 piece", g: 35 },
      { id: "2piece", label: "2 pieces", g: 70 },
      { id: "3piece", label: "3 pieces", g: 105 },
    ],
  },
  {
    name: "Steamed rice",
    cat: "Rice",
    color: "#3b82f6",
    calPer100: 130,
    protein: 3,
    carbs: 28,
    fat: 0,
    portions: [
      { id: "small_katori", label: "Small katori", g: 100 },
      { id: "large_katori", label: "Large katori", g: 200 },
      { id: "plate", label: "Full plate", g: 300 },
    ],
  },
  {
    name: "Biryani",
    cat: "Rice",
    color: "#3b82f6",
    calPer100: 180,
    protein: 7,
    carbs: 25,
    fat: 5,
    portions: [
      { id: "small_katori", label: "Small katori", g: 150 },
      { id: "large_katori", label: "Large katori", g: 250 },
      { id: "plate", label: "Full plate", g: 350 },
    ],
  },
  {
    name: "Jeera rice",
    cat: "Rice",
    color: "#3b82f6",
    calPer100: 140,
    protein: 3,
    carbs: 29,
    fat: 2,
    portions: [
      { id: "small_katori", label: "Small katori", g: 100 },
      { id: "large_katori", label: "Large katori", g: 200 },
      { id: "plate", label: "Full plate", g: 300 },
    ],
  },
  {
    name: "Paneer butter masala",
    cat: "Sabzi",
    color: "#10b981",
    calPer100: 190,
    protein: 10,
    carbs: 9,
    fat: 13,
    portions: [
      { id: "small_katori", label: "Small katori", g: 120 },
      { id: "large_katori", label: "Large katori", g: 200 },
      { id: "piece", label: "2 pieces", g: 80 },
    ],
  },
  {
    name: "Aloo gobi",
    cat: "Sabzi",
    color: "#10b981",
    calPer100: 95,
    protein: 3,
    carbs: 14,
    fat: 3,
    portions: [
      { id: "small_katori", label: "Small katori", g: 120 },
      { id: "large_katori", label: "Large katori", g: 200 },
      { id: "spoon", label: "Spoon", g: 60 },
    ],
  },
  {
    name: "Palak paneer",
    cat: "Sabzi",
    color: "#10b981",
    calPer100: 160,
    protein: 9,
    carbs: 7,
    fat: 10,
    portions: [
      { id: "small_katori", label: "Small katori", g: 120 },
      { id: "large_katori", label: "Large katori", g: 200 },
      { id: "piece", label: "2 pieces", g: 80 },
    ],
  },
  {
    name: "Baingan bharta",
    cat: "Sabzi",
    color: "#10b981",
    calPer100: 75,
    protein: 2,
    carbs: 10,
    fat: 3,
    portions: [
      { id: "small_katori", label: "Small katori", g: 100 },
      { id: "large_katori", label: "Large katori", g: 180 },
      { id: "spoon", label: "Spoon", g: 60 },
    ],
  },
  {
    name: "Matar paneer",
    cat: "Sabzi",
    color: "#10b981",
    calPer100: 175,
    protein: 9,
    carbs: 11,
    fat: 10,
    portions: [
      { id: "small_katori", label: "Small katori", g: 120 },
      { id: "large_katori", label: "Large katori", g: 200 },
      { id: "piece", label: "2 pieces", g: 80 },
    ],
  },
  {
    name: "Paneer (raw)",
    cat: "Paneer",
    color: "#a855f7",
    calPer100: 265,
    protein: 18,
    carbs: 4,
    fat: 19,
    portions: [
      { id: "piece", label: "1 piece", g: 30 },
      { id: "2piece", label: "2 pieces", g: 60 },
      { id: "katori", label: "Katori", g: 100 },
    ],
  },
  {
    name: "Paneer tikka",
    cat: "Paneer",
    color: "#a855f7",
    calPer100: 225,
    protein: 15,
    carbs: 5,
    fat: 15,
    portions: [
      { id: "2piece", label: "2 pieces", g: 80 },
      { id: "4piece", label: "4 pieces", g: 160 },
      { id: "plate", label: "Plate", g: 200 },
    ],
  },
  {
    name: "Shahi paneer",
    cat: "Paneer",
    color: "#a855f7",
    calPer100: 200,
    protein: 10,
    carbs: 8,
    fat: 14,
    portions: [
      { id: "small_katori", label: "Small katori", g: 120 },
      { id: "large_katori", label: "Large katori", g: 200 },
      { id: "piece", label: "2 pieces", g: 80 },
    ],
  },
  {
    name: "Idli",
    cat: "South Indian",
    color: "#06b6d4",
    calPer100: 58,
    protein: 2,
    carbs: 11,
    fat: 0,
    portions: [
      { id: "piece", label: "1 idli", g: 45 },
      { id: "2piece", label: "2 idli", g: 90 },
      { id: "3piece", label: "3 idli", g: 135 },
    ],
  },
  {
    name: "Dosa (plain)",
    cat: "South Indian",
    color: "#06b6d4",
    calPer100: 133,
    protein: 4,
    carbs: 23,
    fat: 3,
    portions: [
      { id: "piece", label: "1 dosa", g: 80 },
      { id: "2piece", label: "2 dosa", g: 160 },
      { id: "3piece", label: "Mini dosa", g: 50 },
    ],
  },
  {
    name: "Sambar",
    cat: "South Indian",
    color: "#06b6d4",
    calPer100: 55,
    protein: 3,
    carbs: 8,
    fat: 1,
    portions: [
      { id: "small_katori", label: "Small katori", ml: 150 },
      { id: "large_katori", label: "Large katori", ml: 250 },
      { id: "cup", label: "Cup", ml: 200 },
    ],
  },
  {
    name: "Curd / dahi",
    cat: "Dairy",
    color: "#64748b",
    calPer100: 60,
    protein: 3,
    carbs: 5,
    fat: 3,
    portions: [
      { id: "small_katori", label: "Small katori", g: 100 },
      { id: "large_katori", label: "Large katori", g: 200 },
      { id: "spoon", label: "Spoon", g: 50 },
    ],
  },
  {
    name: "Lassi (sweet)",
    cat: "Dairy",
    color: "#64748b",
    calPer100: 98,
    protein: 3,
    carbs: 16,
    fat: 3,
    portions: [
      { id: "glass", label: "Glass", ml: 250 },
      { id: "large", label: "Large glass", ml: 400 },
      { id: "small", label: "Small glass", ml: 150 },
    ],
  },
  {
    name: "Poha",
    cat: "Snacks",
    color: "#f59e0b",
    calPer100: 110,
    protein: 3,
    carbs: 22,
    fat: 2,
    portions: [
      { id: "small_katori", label: "Small katori", g: 100 },
      { id: "large_katori", label: "Large katori", g: 180 },
      { id: "plate", label: "Plate", g: 250 },
    ],
  },
  {
    name: "Upma",
    cat: "Snacks",
    color: "#f59e0b",
    calPer100: 120,
    protein: 3,
    carbs: 20,
    fat: 3,
    portions: [
      { id: "small_katori", label: "Small katori", g: 120 },
      { id: "large_katori", label: "Large katori", g: 200 },
      { id: "plate", label: "Plate", g: 280 },
    ],
  },
  {
    name: "Samosa",
    cat: "Snacks",
    color: "#f59e0b",
    calPer100: 262,
    protein: 4,
    carbs: 30,
    fat: 14,
    portions: [
      { id: "piece", label: "1 piece", g: 60 },
      { id: "2piece", label: "2 pieces", g: 120 },
      { id: "3piece", label: "3 pieces", g: 180 },
    ],
  },
];

export const FOOD_CATEGORIES = [
  "All",
  ...Array.from(new Set(INDIAN_FOOD_DB.map((f) => f.cat))),
];

export function searchFoods(query: string, category: string): FoodItem[] {
  return INDIAN_FOOD_DB.filter((f) => {
    const matchCat = category === "All" || f.cat === category;
    const matchQ =
      !query ||
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.cat.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });
}

export function getPortionGrams(food: FoodItem, portionIdx: number): number {
  const p = food.portions[portionIdx];
  return p.g ?? p.ml ?? 100;
}

export function calcCalories(
  food: FoodItem,
  portionIdx: number,
  qty: number,
): number {
  return Math.round(
    ((food.calPer100 * getPortionGrams(food, portionIdx)) / 100) * qty,
  );
}

export function calcMacros(food: FoodItem, portionIdx: number, qty: number) {
  const g = getPortionGrams(food, portionIdx);
  return {
    protein: Math.round(((food.protein * g) / 100) * qty),
    carbs: Math.round(((food.carbs * g) / 100) * qty),
    fat: Math.round(((food.fat * g) / 100) * qty),
  };
}
