
import React from "react";
import JobSearchBar from "./JobSearchBar";
import JobCategories from "./JobCategories";
import JobListHeader from "./JobListHeader";
import JobsList from "./JobsList";
import JobPagination from "./JobPagination";
import { Job } from "../types/job";
import { FormEvent } from "react";

interface JobContentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: FormEvent) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  currentJobs: Job[];
  filteredJobs: Job[];
  onJobClick: (job: Job) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  jobsPerPage: number;
}

const JobContent = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  selectedCategory,
  onCategorySelect,
  currentJobs,
  filteredJobs,
  onJobClick,
  currentPage,
  totalPages,
  setCurrentPage,
  jobsPerPage,
}: JobContentProps) => {
  return (
    <div className="w-full md:w-3/4">
      <JobSearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      
      <JobCategories onCategorySelect={onCategorySelect} />
      
      <JobListHeader 
        selectedCategory={selectedCategory}
        jobCount={filteredJobs.length}
      />
      
      {filteredJobs.length > 0 ? (
        <JobsList jobs={currentJobs} onJobClick={onJobClick} />
      ) : (
        <div className="bg-white p-10 rounded-lg border border-gray-200 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No jobs found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filters to find more opportunities.
          </p>
        </div>
      )}
      
      {filteredJobs.length > jobsPerPage && (
        <JobPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default JobContent;
