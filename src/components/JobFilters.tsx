
import { useState } from "react";

const JobFilters = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "workingSchedule", "employmentType", "companyType", "industry", "education", "distance", "skills"
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => 
      prev.includes(section) 
        ? prev.filter(item => item !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">All Filters</h2>
      
      {/* Working Schedule */}
      <div className="mb-4 border-b pb-3">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("workingSchedule")}
        >
          <h3 className="font-medium">Working Schedule</h3>
          <span>{expandedSections.includes("workingSchedule") ? "−" : "+"}</span>
        </div>
        {expandedSections.includes("workingSchedule") && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="fullTime" className="mr-2" />
              <label htmlFor="fullTime" className="text-sm">Full Time</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="partTime" className="mr-2" />
              <label htmlFor="partTime" className="text-sm">Part Time</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="contract" className="mr-2" />
              <label htmlFor="contract" className="text-sm">Contract</label>
            </div>
          </div>
        )}
      </div>
      
      {/* Employment Type */}
      <div className="mb-4 border-b pb-3">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("employmentType")}
        >
          <h3 className="font-medium">Employment Type</h3>
          <span>{expandedSections.includes("employmentType") ? "−" : "+"}</span>
        </div>
        {expandedSections.includes("employmentType") && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="permanent" className="mr-2" />
              <label htmlFor="permanent" className="text-sm">Permanent</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="temporary" className="mr-2" />
              <label htmlFor="temporary" className="text-sm">Temporary</label>
            </div>
          </div>
        )}
      </div>
      
      {/* Company Type */}
      <div className="mb-4 border-b pb-3">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("companyType")}
        >
          <h3 className="font-medium">Company Type</h3>
          <span>{expandedSections.includes("companyType") ? "−" : "+"}</span>
        </div>
        {expandedSections.includes("companyType") && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="corporate" className="mr-2" />
              <label htmlFor="corporate" className="text-sm">Corporate</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="startup" className="mr-2" />
              <label htmlFor="startup" className="text-sm">Startup</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="agency" className="mr-2" />
              <label htmlFor="agency" className="text-sm">Agency</label>
            </div>
          </div>
        )}
      </div>
      
      {/* Industry */}
      <div className="mb-4 border-b pb-3">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("industry")}
        >
          <h3 className="font-medium">Industry</h3>
          <span>{expandedSections.includes("industry") ? "−" : "+"}</span>
        </div>
        {expandedSections.includes("industry") && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="tech" className="mr-2" />
              <label htmlFor="tech" className="text-sm">Tech</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="finance" className="mr-2" />
              <label htmlFor="finance" className="text-sm">Finance</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="healthcare" className="mr-2" />
              <label htmlFor="healthcare" className="text-sm">Healthcare</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="education" className="mr-2" />
              <label htmlFor="education" className="text-sm">Education</label>
            </div>
          </div>
        )}
      </div>
      
      {/* Education */}
      <div className="mb-4 border-b pb-3">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("education")}
        >
          <h3 className="font-medium">Education</h3>
          <span>{expandedSections.includes("education") ? "−" : "+"}</span>
        </div>
      </div>
      
      {/* Distance */}
      <div className="mb-4 border-b pb-3">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("distance")}
        >
          <h3 className="font-medium">Distance</h3>
          <span>{expandedSections.includes("distance") ? "−" : "+"}</span>
        </div>
      </div>
      
      {/* Skills */}
      <div className="mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("skills")}
        >
          <h3 className="font-medium">Skills</h3>
          <span>{expandedSections.includes("skills") ? "−" : "+"}</span>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
