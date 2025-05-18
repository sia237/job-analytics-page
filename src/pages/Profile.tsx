
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeUpload from "../components/ResumeUpload";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileChart from "../components/ProfileChart";
import ApplicationStatus from "../components/ApplicationStatus";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("performance");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - User Info */}
          <div className="w-full md:w-1/4">
            <ProfileSidebar />
          </div>
          
          {/* Right Section - Profile Content */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              {/* Profile Image & Info */}
              <Card className="w-full lg:w-2/3 p-6 flex items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center relative mr-6">
                  <span className="text-xl font-semibold text-gray-500">A</span>
                  <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                    </svg>
                  </button>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold mb-1">AMAN GUPTA</h2>
                  <p className="text-gray-600">UX/UI Designer</p>
                  <p className="text-gray-600 text-sm">at Amazon</p>
                </div>
              </Card>
              
              {/* Profile Completion */}
              <Card className="w-full lg:w-1/3 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">0%</span>
                  <span className="text-sm text-gray-600">70%</span>
                  <span className="text-sm text-gray-600">100%</span>
                </div>
                
                <div className="h-2 bg-gray-200 rounded-full mb-6 relative">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "70%" }}></div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Education</span>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Add 70%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Phone No.</span>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Add 10%</span>
                </div>

                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Add if missing details</Button>
              </Card>
            </div>
            
            {/* Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 bg-white p-1 rounded-md border border-gray-200">
                <TabsTrigger value="performance" className="data-[state=active]:bg-gray-100">
                  Profile Performance
                </TabsTrigger>
                <TabsTrigger value="applications" className="data-[state=active]:bg-gray-100">
                  Job Application Status
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance" className="mt-0">
                <ProfileChart />
              </TabsContent>
              
              <TabsContent value="applications" className="mt-0">
                <ApplicationStatus />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
