import { UserData, WorkoutType } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface WorkoutChartProps {
  userData: UserData;
}

export const WorkoutChart = ({ userData }: WorkoutChartProps) => {
  const chartData = userData.workouts.map((workout) => ({
    type: workout.type,
    minutes: workout.minutes,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{userData.name}'s workout progress</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minutes" fill="#93C5FD" name="Minutes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};