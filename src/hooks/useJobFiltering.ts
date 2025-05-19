
import { useState, useEffect } from "react";
import { Job } from "../types/job";

export const useJobFiltering = (allJobs: Job[], jobsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(allJobs);
  const [activeFilters, setActiveFilters] = useState<any>({});

  // Apply filters and search
  useEffect(() => {
    let result = allJobs;
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(lowerSearch) || 
        job.company.toLowerCase().includes(lowerSearch) ||
        job.skills.some(skill => skill.toLowerCase().includes(lowerSearch))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      switch (selectedCategory) {
        case "HR":
          result = result.filter(job => 
            job.title.includes("HR") || 
            job.skills.some(skill => skill.includes("Recruitment") || skill.includes("HRIS"))
          );
          break;
        case "Developer":
          result = result.filter(job => 
            job.title.includes("Developer") || 
            job.skills.some(skill => 
              ["React", "JavaScript", "TypeScript", "Node.js", "Express"].includes(skill)
            )
          );
          break;
        case "Designer":
          result = result.filter(job => 
            job.title.includes("Designer") || 
            job.skills.some(skill => 
              ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"].includes(skill)
            )
          );
          break;
        case "SEO":
          result = result.filter(job => 
            job.title.includes("SEO") || 
            job.skills.some(skill => skill.includes("SEO"))
          );
          break;
        case "Marketing":
          result = result.filter(job => 
            job.title.includes("Marketing") || 
            job.skills.some(skill => skill.includes("Marketing"))
          );
          break;
        case "Data Entry":
          result = result.filter(job => 
            job.title.includes("Data Entry") || 
            job.skills.some(skill => skill.includes("Data") || skill.includes("Excel"))
          );
          break;
      }
    }
    
    // Apply advanced filters
    if (Object.keys(activeFilters).length > 0) {
      // Filter by working schedule
      if (activeFilters.workingSchedule) {
        const scheduleFilters = Object.entries(activeFilters.workingSchedule)
          .filter(([_, isActive]) => isActive)
          .map(([key]) => key.toLowerCase());
        
        if (scheduleFilters.length > 0) {
          result = result.filter(job => {
            const jobType = job.type.toLowerCase();
            return scheduleFilters.some(filter => {
              if (filter === "fulltime") return jobType.includes("full-time");
              if (filter === "parttime") return jobType.includes("part-time");
              if (filter === "contract") return jobType.includes("contract");
              return false;
            });
          });
        }
      }
      
      // Filter by skills
      if (activeFilters.skills) {
        const skillFilters = Object.entries(activeFilters.skills)
          .filter(([_, isActive]) => isActive)
          .map(([key]) => key.toLowerCase());
        
        if (skillFilters.length > 0) {
          result = result.filter(job => 
            job.skills.some(skill => 
              skillFilters.some(filter => skill.toLowerCase().includes(filter))
            )
          );
        }
      }
    }
    
    setFilteredJobs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, activeFilters, allJobs]);

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return {
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
  };
};
