
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const data = [
  { name: "1 Day", applications: 30, views: 60 },
  { name: "2 Days", applications: 40, views: 50 },
  { name: "3 Days", applications: 25, views: 45 },
  { name: "4 Days", applications: 20, views: 30 },
  { name: "5 Days", applications: 30, views: 55 },
  { name: "6 Days", applications: 15, views: 40 },
  { name: "7 Days", applications: 25, views: 35 },
];

const ProfileChart = () => {
  const [activeFilter, setActiveFilter] = useState("7days");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-6">Profile Performance</h3>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar name="Job Application" dataKey="applications" fill="#8AE28A" radius={[4, 4, 0, 0]} />
            <Bar name="Job Views" dataKey="views" fill="#E2F1E2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center mt-6 gap-4">
        <Button
          variant={activeFilter === "7days" ? "default" : "outline"}
          onClick={() => setActiveFilter("7days")}
          className={activeFilter === "7days" ? "bg-blue-600" : ""}
        >
          7 Days
        </Button>
        <Button
          variant={activeFilter === "30days" ? "default" : "outline"}
          onClick={() => setActiveFilter("30days")}
          className={activeFilter === "30days" ? "bg-blue-600" : ""}
        >
          Last 30 Days
        </Button>
        <Button
          variant={activeFilter === "90days" ? "default" : "outline"}
          onClick={() => setActiveFilter("90days")}
          className={activeFilter === "90days" ? "bg-blue-600" : ""}
        >
          Last 90 Days
        </Button>
      </div>
    </div>
  );
};

export default ProfileChart;
