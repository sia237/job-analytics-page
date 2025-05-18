
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import ResumeUpload from "../components/ResumeUpload";
import { Button } from "@/components/ui/button";

const ResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - User Info and Quick Links */}
          <div className="w-full md:w-1/4">
            <ProfileSidebar />
            
            <div className="bg-white p-4 rounded-lg mt-4 shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Links</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="#" className="text-blue-600 hover:underline">Resume builder</a>
                <a href="#" className="text-blue-600 hover:underline">Cover letter</a>
                <a href="#" className="text-blue-600 hover:underline">Advanced search</a>
                <a href="#" className="text-blue-600 hover:underline">Job alerts</a>
                <a href="#" className="text-blue-600 hover:underline">Career information</a>
                <a href="#" className="text-blue-600 hover:underline">Help guide</a>
                <a href="#" className="text-blue-600 hover:underline">Interview tips</a>
                <a href="#" className="text-blue-600 hover:underline">Salary guide</a>
              </div>
            </div>
          </div>
          
          {/* Right Section - Resume Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">View & Edit</h2>
              </div>
              
              <ResumeUpload />
            </div>
            
            {/* Resume Sections */}
            <div className="space-y-4">
              {[
                { title: "Education", color: "bg-blue-100", icon: "🎓" },
                { title: "Personal Details", color: "bg-pink-100", icon: "👤" },
                { title: "Key Skills", color: "bg-red-100", icon: "🔑" },
                { title: "Career Preferences", color: "bg-amber-100", icon: "📋" },
                { title: "Languages", color: "bg-green-100", icon: "🌎" },
                { title: "Internships", color: "bg-purple-100", icon: "💼" },
                { title: "Projects", color: "bg-cyan-100", icon: "📊" },
                { title: "Profile Summary", color: "bg-blue-100", icon: "📝" },
                { title: "Accomplishments", color: "bg-pink-100", icon: "🏆" },
                { title: "Entrance Exam", color: "bg-purple-100", icon: "📚" },
                { title: "Employment History", color: "bg-violet-100", icon: "📅" },
                { title: "Academic Achievements", color: "bg-green-100", icon: "🎯" }
              ].map((section, index) => (
                <div 
                  key={index} 
                  className={`${section.color} p-4 rounded-lg flex justify-between items-center`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <button className="bg-white rounded-full p-2 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
