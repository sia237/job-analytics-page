
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between max-w-7xl">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold">Zuperr</Link>
          <nav className="ml-8 hidden md:flex">
            <Link to="/" className="mx-3 border-b-2 border-white">Jobs</Link>
            <Link to="/companies" className="mx-3 text-blue-200 hover:text-white">Companies</Link>
            <Link to="/analytics" className="mx-3 text-blue-200 hover:text-white">Analytics</Link>
            <Link to="/resume-builder" className="mx-3 text-blue-200 hover:text-white">Create resume</Link>
          </nav>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-auto flex items-center gap-2 relative">
            <div className="bg-white rounded-full flex items-center w-full md:w-80 overflow-hidden">
              <Input 
                type="text" 
                placeholder="Jobs, Company, Skill..."
                className="border-0 rounded-l-full focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700 rounded-r-full">
                Search
              </Button>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Guwahati, Maharashtra</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <Link to="/profile">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden border-t border-blue-500">
        <button 
          className="w-full py-2 flex justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="mr-2">{isMenuOpen ? "Close" : "Menu"}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isMenuOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
        </button>
        
        {isMenuOpen && (
          <nav className="px-4 py-2 flex flex-col space-y-2 bg-blue-700">
            <Link to="/" className="py-2">Jobs</Link>
            <Link to="/companies" className="py-2">Companies</Link>
            <Link to="/analytics" className="py-2">Analytics</Link>
            <Link to="/resume-builder" className="py-2">Create resume</Link>
            <Link to="/profile" className="py-2">Profile</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
