import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WORKOUT_TYPES, UserData, WorkoutType } from "@/lib/types";
import { useState } from "react";

interface WorkoutTableProps {
  data: UserData[];
}

export const WorkoutTable = ({ data }: WorkoutTableProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | WorkoutType>("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(search.toLowerCase());
    const typeMatch =
      filter === "All" ||
      user.workouts.some((w) => w.type === filter);
    return nameMatch && typeMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={filter} onValueChange={(value) => setFilter(value as "All" | WorkoutType)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {WORKOUT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Workouts</TableHead>
              <TableHead>Number of Workouts</TableHead>
              <TableHead>Total Workout Minutes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.workouts.map((w) => w.type).join(", ")}</TableCell>
                <TableCell>{user.workouts.length}</TableCell>
                <TableCell>
                  {user.workouts.reduce((sum, w) => sum + w.minutes, 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};