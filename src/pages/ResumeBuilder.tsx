
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import ResumeUpload from "../components/ResumeUpload";
import ResumeDetailDialog from "../components/ResumeDetailDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

// Define the section type for type safety
type SectionType = 
  | "education" 
  | "personalDetails" 
  | "keySkills" 
  | "careerPreferences" 
  | "languages" 
  | "internships" 
  | "projects" 
  | "summary" 
  | "accomplishments" 
  | "exams" 
  | "employment" 
  | "academicAchievements";

interface ResumeSection {
  id: string;
  title: string;
  type: SectionType;
  color: string;
  icon: string;
  data?: Record<string, any> | null;
}

const ResumeBuilder = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<ResumeSection | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resumeSections, setResumeSections] = useState<ResumeSection[]>([
    { id: "personal", title: "Personal Details", type: "personalDetails", color: "bg-pink-100", icon: "👤", data: null },
    { id: "education", title: "Education", type: "education", color: "bg-blue-100", icon: "🎓", data: null },
    { id: "skills", title: "Key Skills", type: "keySkills", color: "bg-red-100", icon: "🔑", data: null },
    { id: "preferences", title: "Career Preferences", type: "careerPreferences", color: "bg-amber-100", icon: "📋", data: null },
    { id: "languages", title: "Languages", type: "languages", color: "bg-green-100", icon: "🌎", data: null },
    { id: "internships", title: "Internships", type: "internships", color: "bg-purple-100", icon: "💼", data: null },
    { id: "projects", title: "Projects", type: "projects", color: "bg-cyan-100", icon: "📊", data: null },
    { id: "summary", title: "Profile Summary", type: "summary", color: "bg-blue-100", icon: "📝", data: null },
    { id: "accomplishments", title: "Accomplishments", type: "accomplishments", color: "bg-pink-100", icon: "🏆", data: null },
    { id: "exams", title: "Entrance Exam", type: "exams", color: "bg-purple-100", icon: "📚", data: null },
    { id: "employment", title: "Employment History", type: "employment", color: "bg-violet-100", icon: "📅", data: null },
    { id: "academic", title: "Academic Achievements", type: "academicAchievements", color: "bg-green-100", icon: "🎯", data: null }
  ]);

  const handleOpenDialog = (section: ResumeSection) => {
    setActiveSection(section);
    setDialogOpen(true);
  };

  const handleSaveSection = (data: Record<string, any>) => {
    if (!activeSection) return;
    
    setResumeSections((prev) =>
      prev.map((section) =>
        section.id === activeSection.id ? { ...section, data } : section
      )
    );
    
    toast({
      title: "Section Updated",
      description: `Your ${activeSection.title.toLowerCase()} information has been saved.`,
    });
  };

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
              {resumeSections.map((section) => (
                <div 
                  key={section.id} 
                  className={`${section.color} p-4 rounded-lg flex justify-between items-center`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <div>
                      <span className="font-medium">{section.title}</span>
                      {section.data && (
                        <p className="text-xs text-gray-600 mt-1">
                          {section.type === "education" && section.data.institution}
                          {section.type === "personalDetails" && section.data.fullName}
                          {section.type === "keySkills" && section.data.skills}
                          {section.type === "employment" && section.data.company}
                          {section.type === "projects" && section.data.title}
                          {/* Add more conditional displays as needed */}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleOpenDialog(section)}
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2 bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <PlusCircle size={20} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Dialog for editing sections */}
      {activeSection && (
        <ResumeDetailDialog
          title={activeSection.title}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          type={activeSection.type}
          initialData={activeSection.data || {}}
          onSave={handleSaveSection}
        />
      )}
    </div>
  );
};

export default ResumeBuilder;
