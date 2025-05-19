
import { useState, FormEvent } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobSidebar from "../components/JobSidebar";
import JobContent from "../components/JobContent";
import JobDetailModal from "../components/JobDetailModal";
import { Job } from "../types/job";
import { useJobFiltering } from "../hooks/useJobFiltering";
import { MOCK_JOBS } from "../data/mockJobs";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const jobsPerPage = 6;

  const {
    currentJobs,
    filteredJobs,
    currentPage,
    totalPages,
    searchTerm,
    selectedCategory,
    setCurrentPage,
    setSearchTerm,
    setSelectedCategory,
    setActiveFilters,
  } = useJobFiltering(MOCK_JOBS, jobsPerPage);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // Search already applied via useEffect in useJobFiltering
  };
  
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6">
          <JobSidebar onFilterChange={handleFilterChange} />
          
          <JobContent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            currentJobs={currentJobs}
            filteredJobs={filteredJobs}
            onJobClick={handleJobClick}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            jobsPerPage={jobsPerPage}
          />
        </div>
      </main>
      <Footer />
      
      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal 
          job={selectedJob} 
          isOpen={isJobModalOpen} 
          onClose={() => setIsJobModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
