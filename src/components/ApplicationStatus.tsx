
import { useState } from "react";
import { Job } from "../types/job";

// Mock applications data
const mockApplications = [
  {
    id: "1",
    job: {
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
    status: "under_review",
    appliedDate: "5 days ago",
    lastUpdate: "3 days ago",
    description: "We have a Great Job Opportunity with a leading Indian MNC into Manufacturing of Industrial Mineral & Specialty Chemicals for Andhra."
  },
  {
    id: "2",
    job: {
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
    status: "recruiter_viewed",
    appliedDate: "7 days ago",
    lastUpdate: "2 days ago",
    description: "We have a Great Job Opportunity with a leading Indian MNC into Manufacturing of Industrial Mineral & Specialty Chemicals for Andhra."
  },
  {
    id: "3",
    job: {
      id: "3",
      title: "Senior UI/UX Designer",
      company: "Amazon",
      location: "Noida (HQ)",
      type: "Hybrid remote",
      experience: "3-5 years",
      salary: "₹ 6-8.5 LPA",
      skills: ["Figma", "Adobe XD", "InVision"],
      postedDate: "01 May, 2023"
    },
    status: "application_submitted",
    appliedDate: "10 days ago",
    lastUpdate: "10 days ago",
    description: "We have a Great Job Opportunity with a leading Indian MNC into Manufacturing of Industrial Mineral & Specialty Chemicals for Andhra."
  },
];

interface ApplicationModalProps {
  application: {
    id: string;
    job: Job;
    status: string;
    appliedDate: string;
    lastUpdate: string;
    description: string;
  };
  onClose: () => void;
}

const ApplicationModal = ({ application, onClose }: ApplicationModalProps) => {
  const getStatusStep = () => {
    switch (application.status) {
      case "application_submitted": return 1;
      case "recruiter_viewed": return 2;
      case "under_review": return 3;
      case "shortlisted": return 4;
      default: return 1;
    }
  };

  const statusStep = getStatusStep();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FFF2E5] rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-md">
              a
            </div>
            <div>
              <h2 className="text-xl font-bold">{application.job.title}</h2>
              <p className="text-gray-700">{application.job.company}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Applied: {application.appliedDate}</span>
          <button className="bg-blue-600 text-white px-4 py-1 text-sm rounded">
            Shortlisted
          </button>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Application Progress</h3>
          <div className="relative">
            <div className="h-1 w-full bg-gray-200 rounded-full mb-6">
              <div 
                className="h-1 bg-blue-600 rounded-full" 
                style={{ width: `${(statusStep / 4) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${statusStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <span className="text-xs mt-1">Application<br />Submitted</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${statusStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <span className="text-xs mt-1">Recruiter<br />Viewed</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${statusStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <span className="text-xs mt-1">Under<br />Review</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${statusStep >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <span className="text-xs mt-1">Under<br />Review</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Job description & Company details</h3>
          <p className="text-gray-700 mb-4">{application.description}</p>
          
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
  );
};

const ApplicationStatus = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const applicationsPerPage = 2;

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = mockApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(mockApplications.length / applicationsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {selectedApplication && (
        <ApplicationModal 
          application={selectedApplication} 
          onClose={() => setSelectedApplication(null)} 
        />
      )}
      
      <h3 className="text-lg font-semibold mb-6">Job Application Status</h3>
      
      <div className="space-y-4">
        {currentApplications.map((app) => (
          <div 
            key={app.id}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setSelectedApplication(app)}
          >
            <div className="flex justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-md">
                  a
                </div>
                <div>
                  <h4 className="font-semibold">{app.job.title}</h4>
                  <p className="text-sm text-gray-600">{app.job.company}</p>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <span>Applied: {app.appliedDate}</span>
                  </div>
                </div>
              </div>
              
              <div>
                {app.status === "application_submitted" && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                    Application Submitted
                  </span>
                )}
                {app.status === "recruiter_viewed" && (
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                    Recruiter Viewed
                  </span>
                )}
                {app.status === "under_review" && (
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                    Under Review
                  </span>
                )}
                {app.status === "shortlisted" && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    Shortlisted
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
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
  );
};

export default ApplicationStatus;
