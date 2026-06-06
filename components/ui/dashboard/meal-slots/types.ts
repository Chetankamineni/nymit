export interface FoodItem {
  name: string;
  cal: number;
}

export interface Meal {
  id: string;
  name: string;
  icon: string;
  color: string;
  calorieGoal: number;
  items: FoodItem[];
}
