import { UserData } from "./types";

const STORAGE_KEY = "workout-tracker-data";

const initialData: UserData[] = [
  {
    id: 1,
    name: "John Doe",
    workouts: [
      { type: "Running", minutes: 30 },
      { type: "Cycling", minutes: 45 }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    workouts: [
      { type: "Swimming", minutes: 60 },
      { type: "Running", minutes: 20 }
    ]
  },
  {
    id: 3,
    name: "Mike Johnson",
    workouts: [
      { type: "Yoga", minutes: 50 },
      { type: "Cycling", minutes: 40 }
    ]
  }
];

export const loadUserData = (): UserData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(stored);
};

export const saveUserData = (data: UserData[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};