export interface Workout {
  type: string;
  minutes: number;
}

export interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}

export type WorkoutType = "Running" | "Cycling" | "Swimming" | "Yoga";

export const WORKOUT_TYPES: WorkoutType[] = ["Running", "Cycling", "Swimming", "Yoga"];