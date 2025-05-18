
import { useState } from "react";
import Navbar from "../components/Navbar";
import JobCategories from "../components/JobCategories";
import JobsList from "../components/JobsList";
import Footer from "../components/Footer";
import JobFilters from "../components/JobFilters";
import { Job } from "../types/job";

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
    title: "Senior UI/UX Designer",
    company: "Amazon",
    location: "Gurgaon (HQ)",
    type: "Part-time remote",
    experience: "3-5 years",
    salary: "₹ 6-8.5 LPA",
    skills: ["Figma", "Adobe XD", "Sketch"],
    postedDate: "01 May, 2023"
  },
  {
    id: "3",
    title: "Senior UI/UX Designer",
    company: "Amazon",
    location: "Gurgaon (HQ)",
    type: "Hybrid remote",
    experience: "3-5 years",
    salary: "₹ 6-8.5 LPA",
    skills: ["Figma", "Adobe XD", "InVision"],
    postedDate: "01 May, 2023"
  },
  {
    id: "4",
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
    id: "5",
    title: "Senior UI/UX Designer",
    company: "Amazon",
    location: "Noida (HQ)",
    type: "Hybrid remote",
    experience: "3-5 years",
    salary: "₹ 6-8.5 LPA",
    skills: ["Figma", "Adobe XD", "Sketch"],
    postedDate: "01 May, 2023"
  },
  {
    id: "6",
    title: "Senior UI/UX Designer",
    company: "Amazon",
    location: "Gurgaon (HQ)",
    type: "Full-time remote",
    experience: "3-5 years",
    salary: "₹ 6-8.5 LPA",
    skills: ["Figma", "Adobe XD", "InVision"],
    postedDate: "01 May, 2023"
  },
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const jobsPerPage = 6;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = MOCK_JOBS.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(MOCK_JOBS.length / jobsPerPage);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
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
            <JobFilters />
          </div>
          
          <div className="w-full md:w-3/4">
            <JobCategories />
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommended Jobs <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{MOCK_JOBS.length}</span></h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Last updated</span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>
            
            <JobsList jobs={currentJobs} onJobClick={handleJobClick} />
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-blue-600'}`}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${currentPage === page 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-600'}`}
                >
                  Next
                </button>
              </nav>
            </div>
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
                  a
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
              <button className="bg-blue-600 text-white px-6 py-2 rounded">Apply</button>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Job description</h3>
              <p className="text-gray-700 mb-4">
                We have a Great Job Opportunity with a leading Indian MNC into Manufacturing of Industrial 
                Mineral & Specialty Chemicals for Andhra.
              </p>
              
              <h4 className="font-semibold mt-4">Technical Skills:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>Adobe Creative Suite: Photoshop, Illustrator, InDesign</li>
                <li>Video tools: Adobe Premiere Pro, After Effects, Final Cut Pro, Corona Pro</li>
                <li>Optional: Blender, Figma, Adobe</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Portfolio:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>A strong design portfolio showcasing both graphic and video work is mandatory</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Soft Skills:</h4>
              <ul className="list-disc pl-6">
                <li>Creative thinking and attention to detail</li>
                <li>Excellent communication and project management skills</li>
                <li>Ability to take feedback and work on tight deadlines</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
