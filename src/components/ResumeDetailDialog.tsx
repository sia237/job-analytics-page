import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface ResumeDetailDialogProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
  initialData?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
}

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
  const [selectedJobRoles, setSelectedJobRoles] = useState<string[]>(formData.jobRoles || []);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(formData.locations || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addJobRole = (role: string) => {
    if (role && !selectedJobRoles.includes(role)) {
      const newRoles = [...selectedJobRoles, role];
      setSelectedJobRoles(newRoles);
      setFormData((prev) => ({ ...prev, jobRoles: newRoles }));
    }
  };

  const removeJobRole = (role: string) => {
    const newRoles = selectedJobRoles.filter(r => r !== role);
    setSelectedJobRoles(newRoles);
    setFormData((prev) => ({ ...prev, jobRoles: newRoles }));
  };

  const addLocation = (location: string) => {
    if (location && !selectedLocations.includes(location)) {
      const newLocations = [...selectedLocations, location];
      setSelectedLocations(newLocations);
      setFormData((prev) => ({ ...prev, locations: newLocations }));
    }
  };

  const removeLocation = (location: string) => {
    const newLocations = selectedLocations.filter(l => l !== location);
    setSelectedLocations(newLocations);
    setFormData((prev) => ({ ...prev, locations: newLocations }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
    toast({
      title: "Section updated",
      description: `Your ${title.toLowerCase()} information has been saved.`,
    });
  };

  const renderCareerPreferencesForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Set your career preferences, define your ideal job roles, industries, and locations to receive 
        tailored opportunities that align with your aspirations and goals.
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobRole">Job Role (Max 3) *</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedJobRoles.map((role) => (
            <span key={role} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {role}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeJobRole(role)} />
            </span>
          ))}
        </div>
        <Input
          placeholder="Job Role"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addJobRole(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Preferred Job Type *</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="jobType" 
              value="fullTime"
              checked={formData.jobType === 'fullTime'}
              onChange={handleChange}
            />
            <span>Full Time</span>
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="jobType" 
              value="partTime"
              checked={formData.jobType === 'partTime'}
              onChange={handleChange}
            />
            <span>Part Time</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Availability to work *</Label>
        <div className="flex flex-wrap gap-3">
          {['15 days or less', '1 month', '2 months', '3 months'].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input 
                type="radio" 
                name="availability" 
                value={option}
                checked={formData.availability === option}
                onChange={handleChange}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" name="servingNotice" checked={formData.servingNotice} onChange={handleChange} />
          <span className="text-sm">Serving Notice period</span>
        </label>
      </div>

      <div className="space-y-2">
        <Label>Preferred Locations</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedLocations.map((location) => (
            <span key={location} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {location}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeLocation(location)} />
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="locationType" value="detect" />
            <span className="text-sm">Detect my Location</span>
          </label>
          <span className="text-sm text-gray-500">OR</span>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Select Location Manually</Label>
          <Select onValueChange={(value) => addLocation(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location Manually" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Delhi/NCR">Delhi/NCR</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
              <SelectItem value="Chennai">Chennai</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="salaryExpectation">Salary Expectation *</Label>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">₹</span>
          <Input
            name="salaryExpectation"
            placeholder="Salary Expectation"
            value={formData.salaryExpectation || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderEducationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Highlighting your academic qualifications, degrees, and certifications to showcasing 
        your expertise and boosting your chances of finding the right opportunity.
      </div>

      <div className="space-y-2">
        <Label htmlFor="education">Add Education *</Label>
        <Select onValueChange={(value) => handleSelectChange('educationLevel', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Add Education" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10th">10th</SelectItem>
            <SelectItem value="12th">12th</SelectItem>
            <SelectItem value="ITI">ITI</SelectItem>
            <SelectItem value="Diploma">Diploma</SelectItem>
            <SelectItem value="Graduate">Graduate</SelectItem>
            <SelectItem value="Post Graduate">Post Graduate</SelectItem>
            <SelectItem value="Doctorate">Doctorate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.educationLevel && (
        <>
          <div className="space-y-2">
            <Label htmlFor="courseName">Course Name *</Label>
            <Select onValueChange={(value) => handleSelectChange('courseName', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Course Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B.Tech">B.Tech</SelectItem>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="BSc">BSc</SelectItem>
                <SelectItem value="BA">BA</SelectItem>
                <SelectItem value="B.Com">B.Com</SelectItem>
                <SelectItem value="MBA">MBA</SelectItem>
                <SelectItem value="MCA">MCA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization *</Label>
            <Select onValueChange={(value) => handleSelectChange('specialization', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Percentage/CGPA * (* Score Out of 10, GPA out of 4, Percentage, course Require Pass)</Label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="scoreType" 
                  value="percentage"
                  checked={formData.scoreType === 'percentage'}
                  onChange={handleChange}
                />
                <span>Percentage</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="scoreType" 
                  value="cgpa"
                  checked={formData.scoreType === 'cgpa'}
                  onChange={handleChange}
                />
                <span>GPA/GPA</span>
              </label>
            </div>
            <div className="flex gap-2">
              <Select onValueChange={(value) => handleSelectChange('scoreStatus', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Appeared" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Appeared">Appeared</SelectItem>
                  <SelectItem value="Passed">Passed</SelectItem>
                  <SelectItem value="Pursuing">Pursuing</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleSelectChange('gradeType', value)}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Out of" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleSelectChange('totalGrade', value)}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Total" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CGPA out of 10">CGPA out of 10</SelectItem>
                  <SelectItem value="GPA out of 4">GPA out of 4</SelectItem>
                  <SelectItem value="GPA out of 4">GPA out of 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">Institute / University Name *</Label>
            <Input
              name="institution"
              placeholder="Institute / University Name"
              value={formData.institution || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Course Duration *</Label>
            <div className="flex gap-2 items-center">
              <Input
                name="startYear"
                placeholder="MM/YYYY"
                value={formData.startYear || ""}
                onChange={handleChange}
                className="w-24"
              />
              <span>To</span>
              <Input
                name="endYear"
                placeholder="MM/YYYY"
                value={formData.endYear || ""}
                onChange={handleChange}
                className="w-24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Course Type *</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="courseType" 
                  value="fullTime"
                  checked={formData.courseType === 'fullTime'}
                  onChange={handleChange}
                />
                <span>Full Time</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="courseType" 
                  value="partTime"
                  checked={formData.courseType === 'partTime'}
                  onChange={handleChange}
                />
                <span>Part Time</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="courseType" 
                  value="distanceLearning"
                  checked={formData.courseType === 'distanceLearning'}
                  onChange={handleChange}
                />
                <span>Distance Learning</span>
              </label>
            </div>
          </div>
        </>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderOtherForms = () => {
    const getFieldsConfig = () => {
      switch (type) {
        case "personalDetails":
          return [
            { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
            { name: "email", label: "Email", type: "email", required: true, placeholder: "john@example.com" },
            { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "+1 555-123-4567" },
            { name: "address", label: "Address", type: "text", placeholder: "New York, USA" },
          ];
        case "keySkills":
          return [
            { name: "skills", label: "Skills (comma separated)", type: "textarea", required: true, placeholder: "JavaScript, React, Node.js, CSS" },
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

    return (
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
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        {type === "careerPreferences" && renderCareerPreferencesForm()}
        {type === "education" && renderEducationForm()}
        {type !== "careerPreferences" && type !== "education" && renderOtherForms()}
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDetailDialog;
