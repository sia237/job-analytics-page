
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSidebar from "../components/ProfileSidebar";

// Sample data for analytics
const jobViewData = [
  { name: 'Sunday', views: 38, applications: 24 },
  { name: 'Monday', views: 52, applications: 40 },
  { name: 'Tuesday', views: 61, applications: 30 },
  { name: 'Wednesday', views: 45, applications: 25 },
  { name: 'Thursday', views: 50, applications: 37 },
  { name: 'Friday', views: 45, applications: 27 },
  { name: 'Saturday', views: 38, applications: 18 },
];

const skillsData = [
  { name: 'React', count: 86 },
  { name: 'JavaScript', count: 67 },
  { name: 'TypeScript', count: 58 },
  { name: 'HTML/CSS', count: 42 },
  { name: 'Node.js', count: 37 },
];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("jobViews");
  const [timeRange, setTimeRange] = useState("7days");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - User Info */}
          <div className="w-full md:w-1/4">
            <ProfileSidebar />
            
            <div className="bg-white p-4 rounded-lg mt-4 shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Links</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="/analytics" className="text-blue-600 hover:underline">Job Views</a>
                <a href="/analytics" className="text-blue-600 hover:underline">Application Stats</a>
                <a href="/analytics" className="text-blue-600 hover:underline">Market Trends</a>
                <a href="/analytics" className="text-blue-600 hover:underline">Skill Demand</a>
              </div>
            </div>
          </div>
          
          {/* Right Section - Analytics Content */}
          <div className="w-full md:w-3/4">
            <Card className="p-6 mb-6">
              <h1 className="text-xl font-bold mb-6">Analytics Dashboard</h1>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4 bg-white p-1 rounded-md border border-gray-200">
                  <TabsTrigger value="jobViews" className="data-[state=active]:bg-gray-100">
                    Job Views & Applications
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="data-[state=active]:bg-gray-100">
                    Skills Analysis
                  </TabsTrigger>
                  <TabsTrigger value="marketTrends" className="data-[state=active]:bg-gray-100">
                    Market Trends
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex justify-end mb-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTimeRange("7days")}
                      className={`px-3 py-1 text-sm rounded-md ${timeRange === "7days" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                    >
                      7 Days
                    </button>
                    <button 
                      onClick={() => setTimeRange("30days")}
                      className={`px-3 py-1 text-sm rounded-md ${timeRange === "30days" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                    >
                      Last 30 Days
                    </button>
                    <button 
                      onClick={() => setTimeRange("90days")}
                      className={`px-3 py-1 text-sm rounded-md ${timeRange === "90days" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                    >
                      Last 90 Days
                    </button>
                  </div>
                </div>
                
                <TabsContent value="jobViews" className="mt-0">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Profile Views & Job Applications</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={jobViewData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="views" name="Profile Views" fill="#82ca9d" />
                        <Bar dataKey="applications" name="Job Applications" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="skills" className="mt-0">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Skills in Demand</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        layout="vertical"
                        data={skillsData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 80,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Job Postings" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="marketTrends" className="mt-0">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Market Trends</h3>
                    <p className="text-gray-500 text-center py-10">
                      Market trends data coming soon...
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Job Application Success Rate</h3>
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 text-2xl font-bold">
                    23%
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Applications: 43</p>
                    <p className="text-sm text-gray-500">Interviews: 10</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Profile Completion</h3>
                <div className="h-2 bg-gray-200 rounded-full mb-3">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "70%" }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>70% Complete</span>
                  <span>3 items remaining</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
