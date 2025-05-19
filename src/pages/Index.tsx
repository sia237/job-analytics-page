
import { useState, useEffect, FormEvent } from "react";
import Navbar from "../components/Navbar";
import JobCategories from "../components/JobCategories";
import JobsList from "../components/JobsList";
import Footer from "../components/Footer";
import JobFilters from "../components/JobFilters";
import { Job } from "../types/job";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { supabase } from "@/lib/supabase";

// Mock data for jobs
const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior UI/UX Designer",
    company: "Amazon",
    location: "Gurgaon (HQ)",
    type: "Full-time remote",
    experience: "3-5 years",
    salary: "₹ 6-8.5 LPA",
    skills: ["Figma", "Adobe XD", "Sketch"],
    postedDate: "01 May, 2023"
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Microsoft",
    location: "Noida (HQ)",
    type: "Part-time remote",
    experience: "2-4 years",
    salary: "₹ 5-7.5 LPA",
    skills: ["React", "JavaScript", "TypeScript"],
    postedDate: "02 May, 2023"
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "Google",
    location: "Bangalore (HQ)",
    type: "Hybrid remote",
    experience: "3-5 years",
    salary: "₹ 7-9 LPA",
    skills: ["Node.js", "Express", "MongoDB"],
    postedDate: "03 May, 2023"
  },
  {
    id: "4",
    title: "Product Manager",
    company: "Apple",
    location: "Delhi (HQ)",
    type: "Full-time remote",
    experience: "4-6 years",
    salary: "₹ 8-12 LPA",
    skills: ["Product Strategy", "Agile", "Roadmapping"],
    postedDate: "04 May, 2023"
  },
  {
    id: "5",
    title: "HR Manager",
    company: "Netflix",
    location: "Noida (HQ)",
    type: "Hybrid remote",
    experience: "5-8 years",
    salary: "₹ 9-14 LPA",
    skills: ["Recruitment", "Employee Relations", "HRIS"],
    postedDate: "05 May, 2023"
  },
  {
    id: "6",
    title: "Data Analyst",
    company: "Facebook",
    location: "Gurgaon (HQ)",
    type: "Full-time remote",
    experience: "2-4 years",
    salary: "₹ 6-8 LPA",
    skills: ["SQL", "Excel", "Tableau"],
    postedDate: "06 May, 2023"
  },
  {
    id: "7",
    title: "SEO Specialist",
    company: "Twitter",
    location: "Mumbai (HQ)",
    type: "Part-time remote",
    experience: "2-3 years",
    salary: "₹ 4-6 LPA",
    skills: ["SEO Tools", "Google Analytics", "Content Strategy"],
    postedDate: "07 May, 2023"
  },
  {
    id: "8",
    title: "Marketing Manager",
    company: "Adobe",
    location: "Pune (HQ)",
    type: "Hybrid remote",
    experience: "4-6 years",
    salary: "₹ 7-10 LPA",
    skills: ["Digital Marketing", "Brand Strategy", "Analytics"],
    postedDate: "08 May, 2023"
  },
  {
    id: "9",
    title: "Data Entry Specialist",
    company: "Oracle",
    location: "Chennai (HQ)",
    type: "Full-time remote",
    experience: "1-2 years",
    salary: "₹ 3-4.5 LPA",
    skills: ["Excel", "Data Management", "Typing"],
    postedDate: "09 May, 2023"
  },
  {
    id: "10",
    title: "DevOps Engineer",
    company: "IBM",
    location: "Hyderabad (HQ)",
    type: "Full-time remote",
    experience: "3-5 years",
    salary: "₹ 7-10 LPA",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    postedDate: "10 May, 2023"
  },
  {
    id: "11",
    title: "Content Writer",
    company: "LinkedIn",
    location: "Bangalore (HQ)",
    type: "Part-time remote",
    experience: "2-3 years",
    salary: "₹ 4-6 LPA",
    skills: ["Copywriting", "Editing", "SEO Writing"],
    postedDate: "11 May, 2023"
  },
  {
    id: "12",
    title: "Graphic Designer",
    company: "Canva",
    location: "Delhi (HQ)",
    type: "Full-time remote",
    experience: "2-4 years",
    salary: "₹ 5-7 LPA",
    skills: ["Photoshop", "Illustrator", "InDesign"],
    postedDate: "12 May, 2023"
  },
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const jobsPerPage = 6;

  // Apply filters and search
  useEffect(() => {
    let result = MOCK_JOBS;
    
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
  }, [searchTerm, selectedCategory, activeFilters]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // Search already applied via useEffect
  };
  
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">Build Your Dream Career with the Right Job</h2>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium mt-2">
                Learn more
              </button>
            </div>
            <JobFilters onFilterChange={handleFilterChange} />
          </div>
          
          <div className="w-full md:w-3/4">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search jobs, companies, or skills..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Search</Button>
              </div>
            </form>
            
            <JobCategories onCategorySelect={handleCategorySelect} />
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedCategory ? `${selectedCategory} Jobs` : "Recommended Jobs"} 
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full ml-2">
                  {filteredJobs.length}
                </span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Last updated</span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>
            
            {filteredJobs.length > 0 ? (
              <JobsList jobs={currentJobs} onJobClick={handleJobClick} />
            ) : (
              <div className="bg-white p-10 rounded-lg border border-gray-200 text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No jobs found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters to find more opportunities.
                </p>
              </div>
            )}
            
            {/* Pagination */}
            {filteredJobs.length > jobsPerPage && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(prev => Math.max(prev - 1, 1));
                        }} 
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        }} 
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Job Detail Modal */}
      {selectedJob && isJobModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FFF2E5] rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-md">
                  {selectedJob.company.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                  <p className="text-gray-700">{selectedJob.company}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsJobModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="bg-white px-2 py-1 rounded">{selectedJob.location}</span>
              <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded">{selectedJob.type}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center text-sm mb-4">
              <span className="font-medium">Experience: </span>
              <span>{selectedJob.experience}</span>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <div className="text-lg font-bold">{selectedJob.salary}</div>
              <Button className="bg-blue-600 hover:bg-blue-700">Apply</Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Job description</h3>
              <p className="text-gray-700 mb-4">
                We have a Great Job Opportunity with a leading company for a {selectedJob.title} position.
              </p>
              
              <h4 className="font-semibold mt-4">Required Skills:</h4>
              <ul className="list-disc pl-6 mb-4">
                {selectedJob.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
                <li>Strong communication and collaboration skills</li>
                <li>Problem-solving mindset and attention to detail</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Responsibilities:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>Work with cross-functional teams to deliver high-quality products</li>
                <li>Stay up-to-date with industry trends and best practices</li>
                <li>Participate in design reviews and provide constructive feedback</li>
                <li>Contribute to the continuous improvement of our processes</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Benefits:</h4>
              <ul className="list-disc pl-6">
                <li>Competitive salary and benefits package</li>
                <li>Flexible work arrangements</li>
                <li>Professional development opportunities</li>
                <li>Collaborative and inclusive work environment</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
