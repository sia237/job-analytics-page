
import React from "react";

interface JobListHeaderProps {
  selectedCategory: string;
  jobCount: number;
}

const JobListHeader = ({ selectedCategory, jobCount }: JobListHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">
        {selectedCategory ? `${selectedCategory} Jobs` : "Recommended Jobs"} 
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full ml-2">
          {jobCount}
        </span>
      </h2>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Last updated</span>
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      </div>
    </div>
  );
};

export default JobListHeader;
