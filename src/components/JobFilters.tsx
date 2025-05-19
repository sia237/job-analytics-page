
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface JobFiltersProps {
  onFilterChange: (filters: any) => void;
}

const JobFilters = ({ onFilterChange }: JobFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    workingSchedule: {
      fullTime: false,
      partTime: false,
      contract: false,
    },
    employmentType: {
      permanent: false,
      temporary: false,
    },
    companyType: {
      corporate: false,
      startup: false,
      agency: false,
    },
    industry: {
      tech: false,
      finance: false,
      healthcare: false,
      education: false,
    },
    education: {
      bachelor: false,
      master: false,
      phd: false,
    },
    distance: "",
    skills: {
      javascript: false,
      react: false,
      node: false,
    }
  });

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => 
      prev.includes(section) 
        ? prev.filter(item => item !== section)
        : [...prev, section]
    );
  };

  const handleCheckboxChange = (category: keyof typeof filters, name: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: !prev[category][name]
      }
    }));
  };

  const handleRadioChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      distance: value
    }));
  };

  const applyFilters = () => {
    // This will trigger the useEffect and notify parent component
    onFilterChange(filters);
  };

  return (
    <>
      <div className="mb-4 md:hidden">
        <Button 
          onClick={() => setShowFilters(!showFilters)} 
          variant="outline" 
          className="w-full flex justify-between items-center"
        >
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          <Filter size={16} />
        </Button>
      </div>

      <div className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 ${showFilters ? 'block' : 'hidden md:block'}`}>
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
                <input 
                  type="checkbox" 
                  id="fullTime" 
                  className="mr-2"
                  checked={filters.workingSchedule.fullTime}
                  onChange={() => handleCheckboxChange("workingSchedule", "fullTime")}
                />
                <label htmlFor="fullTime" className="text-sm">Full Time</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="partTime" 
                  className="mr-2"
                  checked={filters.workingSchedule.partTime}
                  onChange={() => handleCheckboxChange("workingSchedule", "partTime")}
                />
                <label htmlFor="partTime" className="text-sm">Part Time</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="contract" 
                  className="mr-2"
                  checked={filters.workingSchedule.contract}
                  onChange={() => handleCheckboxChange("workingSchedule", "contract")}
                />
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
                <input 
                  type="checkbox" 
                  id="permanent" 
                  className="mr-2"
                  checked={filters.employmentType.permanent}
                  onChange={() => handleCheckboxChange("employmentType", "permanent")}
                />
                <label htmlFor="permanent" className="text-sm">Permanent</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="temporary" 
                  className="mr-2"
                  checked={filters.employmentType.temporary}
                  onChange={() => handleCheckboxChange("employmentType", "temporary")}
                />
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
                <input 
                  type="checkbox" 
                  id="corporate" 
                  className="mr-2"
                  checked={filters.companyType.corporate}
                  onChange={() => handleCheckboxChange("companyType", "corporate")}
                />
                <label htmlFor="corporate" className="text-sm">Corporate</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="startup" 
                  className="mr-2"
                  checked={filters.companyType.startup}
                  onChange={() => handleCheckboxChange("companyType", "startup")}
                />
                <label htmlFor="startup" className="text-sm">Startup</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="agency" 
                  className="mr-2"
                  checked={filters.companyType.agency}
                  onChange={() => handleCheckboxChange("companyType", "agency")}
                />
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
                <input 
                  type="checkbox" 
                  id="tech" 
                  className="mr-2"
                  checked={filters.industry.tech}
                  onChange={() => handleCheckboxChange("industry", "tech")}
                />
                <label htmlFor="tech" className="text-sm">Tech</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="finance" 
                  className="mr-2"
                  checked={filters.industry.finance}
                  onChange={() => handleCheckboxChange("industry", "finance")}
                />
                <label htmlFor="finance" className="text-sm">Finance</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="healthcare" 
                  className="mr-2"
                  checked={filters.industry.healthcare}
                  onChange={() => handleCheckboxChange("industry", "healthcare")}
                />
                <label htmlFor="healthcare" className="text-sm">Healthcare</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="education" 
                  className="mr-2"
                  checked={filters.industry.education}
                  onChange={() => handleCheckboxChange("industry", "education")}
                />
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
          {expandedSections.includes("education") && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="bachelor" 
                  className="mr-2"
                  checked={filters.education.bachelor}
                  onChange={() => handleCheckboxChange("education", "bachelor")}
                />
                <label htmlFor="bachelor" className="text-sm">Bachelor's Degree</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="master" 
                  className="mr-2"
                  checked={filters.education.master}
                  onChange={() => handleCheckboxChange("education", "master")}
                />
                <label htmlFor="master" className="text-sm">Master's Degree</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="phd" 
                  className="mr-2"
                  checked={filters.education.phd}
                  onChange={() => handleCheckboxChange("education", "phd")}
                />
                <label htmlFor="phd" className="text-sm">PhD</label>
              </div>
            </div>
          )}
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
          {expandedSections.includes("distance") && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="distance" 
                  id="distance5" 
                  className="mr-2"
                  checked={filters.distance === "5"}
                  onChange={() => handleRadioChange("5")}
                />
                <label htmlFor="distance5" className="text-sm">Within 5 miles</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="distance" 
                  id="distance10" 
                  className="mr-2"
                  checked={filters.distance === "10"}
                  onChange={() => handleRadioChange("10")}
                />
                <label htmlFor="distance10" className="text-sm">Within 10 miles</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="distance" 
                  id="distance25" 
                  className="mr-2"
                  checked={filters.distance === "25"}
                  onChange={() => handleRadioChange("25")}
                />
                <label htmlFor="distance25" className="text-sm">Within 25 miles</label>
              </div>
            </div>
          )}
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
          {expandedSections.includes("skills") && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="javascript" 
                  className="mr-2"
                  checked={filters.skills.javascript}
                  onChange={() => handleCheckboxChange("skills", "javascript")}
                />
                <label htmlFor="javascript" className="text-sm">JavaScript</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="react" 
                  className="mr-2"
                  checked={filters.skills.react}
                  onChange={() => handleCheckboxChange("skills", "react")}
                />
                <label htmlFor="react" className="text-sm">React</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="node" 
                  className="mr-2"
                  checked={filters.skills.node}
                  onChange={() => handleCheckboxChange("skills", "node")}
                />
                <label htmlFor="node" className="text-sm">Node.js</label>
              </div>
            </div>
          )}
        </div>

        <Button 
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </>
  );
};

export default JobFilters;
