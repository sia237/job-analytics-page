
import React from "react";
import JobFilters from "./JobFilters";

interface JobSidebarProps {
  onFilterChange: (filters: any) => void;
}

const JobSidebar = ({ onFilterChange }: JobSidebarProps) => {
  return (
    <div className="w-full md:w-1/4">
      <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">Build Your Dream Career with the Right Job</h2>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium mt-2 hover:bg-blue-50 transition-colors">
          Learn more
        </button>
      </div>
      <JobFilters onFilterChange={onFilterChange} />
    </div>
  );
};

export default JobSidebar;
