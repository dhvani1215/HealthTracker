import { useState, useEffect } from "react";
import { WorkoutForm } from "@/components/WorkoutForm";
import { WorkoutTable } from "@/components/WorkoutTable";
import { WorkoutChart } from "@/components/WorkoutChart";
import { UserData, WorkoutType } from "@/lib/types";
import { loadUserData, saveUserData } from "@/lib/storage";

const Index = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    const data = loadUserData();
    setUserData(data);
    if (data.length > 0) {
      setSelectedUser(data[0]);
    }
  }, []);

  const handleAddWorkout = (name: string, type: WorkoutType, minutes: number) => {
    const existingUser = userData.find(
      (u) => u.name.toLowerCase() === name.toLowerCase()
    );

    const newUserData = [...userData];

    if (existingUser) {
      const userIndex = newUserData.findIndex((u) => u.id === existingUser.id);
      newUserData[userIndex] = {
        ...existingUser,
        workouts: [...existingUser.workouts, { type, minutes }],
      };
    } else {
      const newUser: UserData = {
        id: Date.now(),
        name,
        workouts: [{ type, minutes }],
      };
      newUserData.push(newUser);
    }

    setUserData(newUserData);
    saveUserData(newUserData);

    // Update selected user if it's the same user
    if (selectedUser && selectedUser.name.toLowerCase() === name.toLowerCase()) {
      const updatedUser = newUserData.find((u) => u.id === selectedUser.id);
      if (updatedUser) {
        setSelectedUser(updatedUser);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Health Challenge Tracker
        </h1>

        <WorkoutForm onSubmit={handleAddWorkout} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WorkoutTable data={userData} />
          </div>
          <div>
            {selectedUser && <WorkoutChart userData={selectedUser} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;