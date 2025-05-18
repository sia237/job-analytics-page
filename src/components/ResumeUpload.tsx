
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ResumeUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is PDF, DOC, or DOCX
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive"
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }
    
    setUploadedFile(file);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been uploaded.`,
      variant: "default"
    });
  };

  const handleDelete = () => {
    setUploadedFile(null);
    toast({
      title: "File deleted",
      description: "Your resume has been deleted.",
      variant: "default"
    });
  };

  const handleParseResume = () => {
    if (!uploadedFile) return;
    
    // Normally this would be an API call to parse the resume
    toast({
      title: "Resume parsing started",
      description: "Your resume is being analyzed for relevant information.",
      variant: "default"
    });
    
    // Mock delay to simulate parsing
    setTimeout(() => {
      toast({
        title: "Resume parsed successfully",
        description: "Your profile has been updated with the resume information.",
        variant: "default"
      });
    }, 2000);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Upload Resume</h3>
      <p className="text-sm text-gray-600 mb-4">
        Upload your resume to help recruiters find you. We accept PDF, DOC, and DOCX files up to 5MB.
      </p>
      
      {uploadedFile ? (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleParseResume}
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                Parse
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDelete}
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("resumeUpload")?.click()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <p className="text-gray-600 mb-1">Drag & drop your resume here</p>
          <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
          <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
            Upload Resume
          </Button>
          <input
            id="resumeUpload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
