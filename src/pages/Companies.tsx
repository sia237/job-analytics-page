
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search } from "lucide-react";

// Sample companies data
const COMPANIES = [
  {
    id: 1,
    name: "Amazon",
    logo: "A",
    industry: "Technology",
    location: "Seattle, WA",
    employees: "1,000,000+",
    jobs: 123,
    rating: 4.2,
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "M",
    industry: "Software",
    location: "Redmond, WA",
    employees: "180,000+",
    jobs: 85,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Google",
    logo: "G",
    industry: "Technology",
    location: "Mountain View, CA",
    employees: "150,000+",
    jobs: 92,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Apple",
    logo: "A",
    industry: "Technology",
    location: "Cupertino, CA",
    employees: "160,000+",
    jobs: 78,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Facebook",
    logo: "F",
    industry: "Social Media",
    location: "Menlo Park, CA",
    employees: "70,000+",
    jobs: 65,
    rating: 4.4,
  },
  {
    id: 6,
    name: "Netflix",
    logo: "N",
    industry: "Entertainment",
    location: "Los Gatos, CA",
    employees: "12,000+",
    jobs: 42,
    rating: 4.3,
  },
  {
    id: 7,
    name: "Tesla",
    logo: "T",
    industry: "Automotive",
    location: "Palo Alto, CA",
    employees: "100,000+",
    jobs: 56,
    rating: 4.0,
  },
  {
    id: 8,
    name: "Adobe",
    logo: "A",
    industry: "Software",
    location: "San Jose, CA",
    employees: "25,000+",
    jobs: 38,
    rating: 4.4,
  },
  {
    id: 9,
    name: "Salesforce",
    logo: "S",
    industry: "Cloud Computing",
    location: "San Francisco, CA",
    employees: "70,000+",
    jobs: 47,
    rating: 4.5,
  },
];

const INDUSTRIES = [
  "All Industries",
  "Technology",
  "Software",
  "Entertainment",
  "Automotive",
  "Cloud Computing", 
  "Social Media",
  "Finance",
  "Healthcare",
];

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [showFilters, setShowFilters] = useState(false);
  
  const companiesPerPage = 6;
  
  // Filter companies based on search term and industry
  const filteredCompanies = COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          company.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All Industries" || company.industry === selectedIndustry;
    
    return matchesSearch && matchesIndustry;
  });
  
  // Paginate companies
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">Companies</h1>
        
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search companies by name or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="whitespace-nowrap"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-2">Filter by Industry</h3>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedIndustry === industry
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentCompanies.map((company) => (
            <div key={company.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mr-3">
                    {company.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{company.name}</h3>
                    <p className="text-gray-600 text-sm">{company.industry}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span className="text-gray-600 text-sm">{company.location}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <span className="text-gray-600 text-sm">{company.employees}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(company.rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-1">{company.rating}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 text-sm rounded">
                    {company.jobs} jobs
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
                  View Company
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {filteredCompanies.length > companiesPerPage && (
          <Pagination className="mb-6">
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Companies;
