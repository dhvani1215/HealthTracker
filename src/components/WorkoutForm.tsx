import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WORKOUT_TYPES, WorkoutType } from "@/lib/types";
import { toast } from "sonner";

interface WorkoutFormProps {
  onSubmit: (name: string, type: WorkoutType, minutes: number) => void;
}

export const WorkoutForm = ({ onSubmit }: WorkoutFormProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<WorkoutType>("Running");
  const [minutes, setMinutes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    const minutesNum = parseInt(minutes);
    if (isNaN(minutesNum) || minutesNum <= 0) {
      toast.error("Please enter valid minutes");
      return;
    }

    onSubmit(name.trim(), type, minutesNum);
    setName("");
    setMinutes("");
    toast.success("Workout added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          User Name*
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Workout Type*
        </label>
        <Select value={type} onValueChange={(value) => setType(value as WorkoutType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select workout type" />
          </SelectTrigger>
          <SelectContent>
            {WORKOUT_TYPES.map((workoutType) => (
              <SelectItem key={workoutType} value={workoutType}>
                {workoutType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">
          Workout Minutes*
        </label>
        <Input
          id="minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Enter minutes"
          min="1"
          className="w-full"
        />
      </div>

      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
        Add Workout
      </Button>
    </form>
  );
};