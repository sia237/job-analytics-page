
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ResumeDetailDialogProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
  initialData?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
}

type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "textarea";
  required?: boolean;
  placeholder?: string;
};

const ResumeDetailDialog = ({
  title,
  open,
  onOpenChange,
  type,
  initialData = {},
  onSave,
}: ResumeDetailDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, any>>(initialData);

  // Define fields based on section type
  const getFieldsConfig = (): FieldConfig[] => {
    switch (type) {
      case "personalDetails":
        return [
          { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
          { name: "email", label: "Email", type: "email", required: true, placeholder: "john@example.com" },
          { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "+1 555-123-4567" },
          { name: "address", label: "Address", type: "text", placeholder: "New York, USA" },
        ];
      case "education":
        return [
          { name: "institution", label: "Institution/University", type: "text", required: true, placeholder: "University of Technology" },
          { name: "degree", label: "Degree/Certificate", type: "text", required: true, placeholder: "Bachelor of Computer Science" },
          { name: "startDate", label: "Start Date", type: "date", required: true },
          { name: "endDate", label: "End Date", type: "date" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Describe your education" },
        ];
      case "keySkills":
        return [
          { name: "skills", label: "Skills (comma separated)", type: "textarea", required: true, placeholder: "JavaScript, React, Node.js, CSS" },
        ];
      case "careerPreferences":
        return [
          { name: "jobTitle", label: "Preferred Job Title", type: "text", required: true, placeholder: "Software Engineer" },
          { name: "location", label: "Preferred Location", type: "text", placeholder: "Remote, New York" },
          { name: "salary", label: "Expected Salary", type: "text", placeholder: "$80,000 - $100,000" },
        ];
      case "languages":
        return [
          { name: "language", label: "Language", type: "text", required: true, placeholder: "English" },
          { name: "proficiency", label: "Proficiency Level", type: "text", required: true, placeholder: "Native, Fluent, Intermediate, Basic" },
        ];
      case "internships":
      case "employment":
        return [
          { name: "company", label: "Company", type: "text", required: true, placeholder: "ABC Corporation" },
          { name: "position", label: "Position", type: "text", required: true, placeholder: "Software Developer" },
          { name: "startDate", label: "Start Date", type: "date", required: true },
          { name: "endDate", label: "End Date", type: "date" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Describe your responsibilities and achievements" },
        ];
      case "projects":
        return [
          { name: "title", label: "Project Title", type: "text", required: true, placeholder: "E-commerce Website" },
          { name: "technologies", label: "Technologies Used", type: "text", required: true, placeholder: "React, Node.js, MongoDB" },
          { name: "startDate", label: "Start Date", type: "date" },
          { name: "endDate", label: "End Date", type: "date" },
          { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Describe your project and your role" },
        ];
      case "summary":
        return [
          { name: "summary", label: "Profile Summary", type: "textarea", required: true, placeholder: "A brief overview of your professional background and goals" },
        ];
      case "accomplishments":
        return [
          { name: "title", label: "Title", type: "text", required: true, placeholder: "Award/Achievement" },
          { name: "issuer", label: "Issuer/Organization", type: "text", placeholder: "Organization Name" },
          { name: "date", label: "Date", type: "date" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Describe your accomplishment" },
        ];
      case "exams":
        return [
          { name: "examName", label: "Exam Name", type: "text", required: true, placeholder: "GRE, GMAT, etc." },
          { name: "score", label: "Score", type: "text", required: true, placeholder: "320/340" },
          { name: "date", label: "Date", type: "date" },
        ];
      case "academicAchievements":
        return [
          { name: "title", label: "Achievement Title", type: "text", required: true, placeholder: "Dean's List" },
          { name: "institution", label: "Institution", type: "text", required: true, placeholder: "University of Technology" },
          { name: "date", label: "Date", type: "date" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Describe your academic achievement" },
        ];
      default:
        return [];
    }
  };

  const fieldsConfig = getFieldsConfig();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const missingFields = fieldsConfig
      .filter((field) => field.required && !formData[field.name])
      .map((field) => field.label);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }
    
    onSave(formData);
    onOpenChange(false);
    
    toast({
      title: "Section updated",
      description: `Your ${title.toLowerCase()} information has been saved.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {fieldsConfig.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full"
                  rows={4}
                />
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full"
                />
              )}
            </div>
          ))}
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDetailDialog;
