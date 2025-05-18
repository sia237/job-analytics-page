
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, Trash2, FileText } from "lucide-react";

const ResumeUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
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

  const handleFile = async (file: File) => {
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
    setIsUploading(true);
    
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('user-resumes')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-resumes')
        .getPublicUrl(filePath);
        
      setFileUrl(publicUrl);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!fileUrl || !uploadedFile) return;
    
    try {
      // Extract file path from URL
      const pathMatch = fileUrl.match(/user-resumes\/(.+)$/);
      if (!pathMatch) throw new Error('Invalid file path');
      
      const filePath = pathMatch[1];
      
      // Delete file from Supabase Storage
      const { error } = await supabase.storage
        .from('user-resumes')
        .remove([filePath]);
        
      if (error) throw error;
      
      setUploadedFile(null);
      setFileUrl(null);
      
      toast({
        title: "File deleted",
        description: "Your resume has been deleted.",
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleParseResume = async () => {
    if (!fileUrl) return;
    
    setIsParsing(true);
    
    try {
      // Call Supabase Edge Function to parse resume
      const { data, error } = await supabase.functions.invoke('parse-resume', {
        body: { fileUrl }
      });
      
      if (error) throw error;
      
      if (data && data.success) {
        // Store the parsed data or update the UI
        console.log('Parsed resume data:', data.data);
        
        toast({
          title: "Resume parsed successfully",
          description: "Your profile has been updated with the resume information.",
        });
        
        // Here you would typically update state/context with the parsed data
        // or dispatch actions to update the UI with the parsed information
      } else {
        throw new Error('Failed to parse resume');
      }
      
    } catch (error) {
      console.error('Error parsing resume:', error);
      toast({
        title: "Parsing failed",
        description: "There was an error parsing your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsParsing(false);
    }
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
                <FileText size={24} className="text-gray-700" />
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
                disabled={isParsing}
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                {isParsing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Parsing...
                  </>
                ) : (
                  'Parse'
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDelete}
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} className="mr-2" />
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
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="text-blue-500 animate-spin mb-2" />
              <p className="text-gray-600">Uploading...</p>
            </div>
          ) : (
            <>
              <Upload size={40} className="text-gray-400 mb-2" />
              <p className="text-gray-600 mb-1">Drag & drop your resume here</p>
              <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                Upload Resume
              </Button>
            </>
          )}
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
