import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
  const [selectedSkills, setSelectedSkills] = useState<string[]>(formData.skills || []);
  const [selectedAchievements, setSelectedAchievements] = useState<string[]>(formData.achievements || []);
  const [accomplishmentSlide, setAccomplishmentSlide] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(formData.dateOfBirth || undefined);

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

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      setFormData((prev) => ({ ...prev, skills: newSkills }));
    }
  };

  const removeSkill = (skill: string) => {
    const newSkills = selectedSkills.filter(s => s !== skill);
    setSelectedSkills(newSkills);
    setFormData((prev) => ({ ...prev, skills: newSkills }));
  };

  const addAchievement = (achievement: string) => {
    if (achievement && !selectedAchievements.includes(achievement)) {
      const newAchievements = [...selectedAchievements, achievement];
      setSelectedAchievements(newAchievements);
      setFormData((prev) => ({ ...prev, achievements: newAchievements }));
    }
  };

  const removeAchievement = (achievement: string) => {
    const newAchievements = selectedAchievements.filter(a => a !== achievement);
    setSelectedAchievements(newAchievements);
    setFormData((prev) => ({ ...prev, achievements: newAchievements }));
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

  const renderPersonalDetailsForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Personal details are core essential information like name, contact details, and 
        address that helps employers reach and get an overview about you.
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Full Name*</Label>
        <Input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Date of Birth*</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateOfBirth && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateOfBirth}
              onSelect={(date) => {
                setDateOfBirth(date);
                setFormData((prev) => ({ ...prev, dateOfBirth: date }));
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Gender*</Label>
        <Select onValueChange={(value) => handleSelectChange('gender', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Male" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Marital Status</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="maritalStatus" 
              value="married"
              checked={formData.maritalStatus === 'married'}
              onChange={handleChange}
            />
            <span>Married</span>
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="maritalStatus" 
              value="unmarried"
              checked={formData.maritalStatus === 'unmarried'}
              onChange={handleChange}
            />
            <span>Unmarried</span>
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="maritalStatus" 
              value="divorced"
              checked={formData.maritalStatus === 'divorced'}
              onChange={handleChange}
            />
            <span>Divorced</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium">Contact Information:</Label>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Email Address*</Label>
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Phone No.*</Label>
          <Input
            name="phone"
            placeholder="Phone No."
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderEmploymentHistoryForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Employment History is detailing your professional journey by listing roles, responsibilities, and 
        achievements, showcasing your experience and career growth.
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Enter Total Work Experience*</Label>
        <div className="flex gap-2">
          <Select onValueChange={(value) => handleSelectChange('experienceMonths', value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Months" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>{i} Months</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleSelectChange('experienceYears', value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Years" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 50 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>{i} Years</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Company Name*</Label>
        <Select onValueChange={(value) => handleSelectChange('companyName', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Company Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Amazon">Amazon</SelectItem>
            <SelectItem value="IBM">IBM</SelectItem>
            <SelectItem value="Google">Google</SelectItem>
            <SelectItem value="Microsoft">Microsoft</SelectItem>
            <SelectItem value="Apple">Apple</SelectItem>
            <SelectItem value="Meta">Meta</SelectItem>
            <SelectItem value="Netflix">Netflix</SelectItem>
            <SelectItem value="Tesla">Tesla</SelectItem>
            <SelectItem value="Uber">Uber</SelectItem>
            <SelectItem value="Airbnb">Airbnb</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Job Title/Position Held*</Label>
        <Input
          name="jobTitle"
          placeholder="Job Title/Position Held"
          value={formData.jobTitle || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Duration of Employment*</Label>
        <div className="flex gap-2 items-center">
          <Input
            name="startDate"
            placeholder="MM/YYYY"
            value={formData.startDate || ""}
            onChange={handleChange}
            className="flex-1"
          />
          <span className="text-sm">To</span>
          <Input
            name="endDate"
            placeholder="MM/YYYY"
            value={formData.endDate || ""}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
        <label className="flex items-center gap-2 mt-2">
          <input 
            type="checkbox" 
            name="currentlyWorking" 
            checked={formData.currentlyWorking || false}
            onChange={handleChange}
          />
          <span className="text-sm">I currently work here</span>
        </label>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Key Achievements*</Label>
        <Input
          name="keyAchievements"
          placeholder="Key Achievements"
          value={formData.keyAchievements || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Annual Salary*</Label>
        <div className="flex gap-2">
          <span className="flex items-center text-gray-500">₹</span>
          <Input
            name="annualSalary"
            placeholder="Annual Salary"
            value={formData.annualSalary || ""}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Role Description*</Label>
        <div className="text-xs text-gray-500 mb-1">Describe what you did at work</div>
        <Textarea
          name="roleDescription"
          placeholder="Role Description"
          value={formData.roleDescription || ""}
          onChange={handleChange}
          className="min-h-24"
        />
        <div className="text-xs text-gray-500 text-right">
          Up to 0-300 characters only
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderAccomplishmentsForm = () => {
    const slides = [
      {
        title: "Committees / Clubs & Extracurricular",
        fields: [
          { name: "clubName", label: "Club/Committee/ Activity Name*", type: "text" },
          { name: "positionHeld", label: "Position Held At*", type: "select", options: ["President", "Vice President", "Secretary", "Treasurer", "Member"] },
          { name: "educationReference", label: "Education Reference (Optional)", type: "text" },
          { name: "duration", label: "Duration*", type: "dateRange" },
          { name: "responsibilities", label: "Responsibilities and Contributions*", type: "textarea" }
        ]
      },
      {
        title: "Awards and Recognitions", 
        fields: [
          { name: "description", label: "Description*", type: "textarea" }
        ]
      },
      {
        title: "Certifications",
        fields: [
          { name: "certificationName", label: "Certification Name*", type: "text" },
          { name: "certificationId", label: "Certification ID*", type: "text" },
          { name: "certificationUrl", label: "Certification URL*", type: "text" },
          { name: "certificationValidity", label: "Certification validity*", type: "text" }
        ]
      }
    ];

    const currentSlide = slides[accomplishmentSlide];

    return (
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="text-sm text-gray-600 mb-4">
          Accomplishments highlight your achievements, showcasing how you're excelling in your field 
          and adding value to your professional profile.
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full ${
                  index === accomplishmentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <h3 className="text-lg font-medium mb-4">{currentSlide.title}</h3>

        {currentSlide.fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label className="text-sm font-medium">{field.label}</Label>
            
            {field.type === "text" && (
              <Input
                name={field.name}
                placeholder={field.label.replace('*', '')}
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            )}
            
            {field.type === "select" && (
              <Select onValueChange={(value) => handleSelectChange(field.name, value)}>
                <SelectTrigger>
                  <SelectValue placeholder={field.label.replace('*', '')} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {field.type === "dateRange" && (
              <div className="flex gap-2 items-center">
                <Input
                  name={`${field.name}Start`}
                  placeholder="MM/YYYY"
                  value={formData[`${field.name}Start`] || ""}
                  onChange={handleChange}
                  className="flex-1"
                />
                <span className="text-sm">To</span>
                <Input
                  name={`${field.name}End`}
                  placeholder="MM/YYYY"
                  value={formData[`${field.name}End`] || ""}
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>
            )}
            
            {field.type === "textarea" && (
              <>
                <Textarea
                  name={field.name}
                  placeholder={field.label.replace('*', '')}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="min-h-32"
                />
                <div className="text-xs text-gray-500 text-right">
                  Up to 0-1000 characters only
                </div>
              </>
            )}
          </div>
        ))}

        {accomplishmentSlide === 2 && (
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                name="certificationNoExpiry" 
                checked={formData.certificationNoExpiry || false}
                onChange={handleChange}
              />
              <span className="text-sm">This certification does not expire</span>
            </label>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {accomplishmentSlide > 0 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setAccomplishmentSlide(accomplishmentSlide - 1)}
              >
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {accomplishmentSlide < slides.length - 1 ? (
              <Button 
                type="button" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setAccomplishmentSlide(accomplishmentSlide + 1)}
              >
                NEXT
              </Button>
            ) : (
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save
              </Button>
            )}
          </div>
        </DialogFooter>
      </form>
    );
  };

  const renderKeySkillsForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Key skill lets you highlight your core abilities and expertise, helping employers quickly 
        identify your strengths and match you with the right job opportunities.
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Skill</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedSkills.map((skill) => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {skill}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Add Skills*</Label>
        <Input
          placeholder="Add Skills"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderLanguagesForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Languages lets you specify the languages you are proficient in, helping employers assess 
        your communication skills and match you with roles that require specific language expertise.
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Languages Spoken*</Label>
        <Select onValueChange={(value) => handleSelectChange('languageSpoken', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Languages Spoken" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Hindi">Hindi</SelectItem>
            <SelectItem value="Regional Languages (Specify)">Regional Languages (Specify)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Proficiency Levels*</Label>
        <Select onValueChange={(value) => handleSelectChange('proficiencyLevels', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Proficiency Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Read: Basic/Intermediate/Fluent">Read: Basic/Intermediate/Fluent</SelectItem>
            <SelectItem value="Write: Basic/Intermediate/Fluent">Write: Basic/Intermediate/Fluent</SelectItem>
            <SelectItem value="Speak: Basic/Intermediate/Fluent">Speak: Basic/Intermediate/Fluent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderProfileSummaryForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Your profile summary should highlight key points from your career and education, your 
        professional interests, and the kind of career you're looking for. write at least 50 characters 
        (max. 1000 characters)
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Profile Summary*</Label>
        <Textarea
          name="profileSummary"
          placeholder="Profile Summary"
          value={formData.profileSummary || ""}
          onChange={handleChange}
          className="min-h-32"
        />
        <div className="text-xs text-gray-500 text-right">
          Up to 0-1000 characters only
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderProjectsForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Projects let you showcase your hands-on experience, highlighting how you've applying your 
        skills in real-world scenarios and helping employers assess your practical abilities for the 
        role you're applying for.
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Project Name*</Label>
        <Input
          name="projectName"
          placeholder="Project Name"
          value={formData.projectName || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Project Duration*</Label>
        <div className="flex gap-2 items-center">
          <Input
            name="projectStartDate"
            placeholder="MM/YYYY"
            value={formData.projectStartDate || ""}
            onChange={handleChange}
            className="flex-1"
          />
          <span className="text-sm">To</span>
          <Input
            name="projectEndDate"
            placeholder="MM/YYYY"
            value={formData.projectEndDate || ""}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Description of what the project was about*</Label>
        <Textarea
          name="projectDescription"
          placeholder="Description of what the project was about"
          value={formData.projectDescription || ""}
          onChange={handleChange}
          className="min-h-24"
        />
        <div className="text-xs text-gray-500 text-right">
          Up to 0-300 characters only
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Key Skills used in the Project (Optional)</Label>
        <Input
          name="projectSkills"
          placeholder="Key Skills used in the Project (Optional)"
          value={formData.projectSkills || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Result / Conclusions*</Label>
        <Input
          name="projectResult"
          placeholder="Result / Conclusions"
          value={formData.projectResult || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Project URL (Optional)</Label>
        <Input
          name="projectUrl"
          placeholder="Project URL (Optional)"
          value={formData.projectUrl || ""}
          onChange={handleChange}
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderAcademicAchievementsForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Academic achievements are highlighting your educational milestones, honors, and 
        recognitions that reflect your dedication and excellence in learning.
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Education Reference (Optional)</Label>
        <Input
          name="educationReference"
          placeholder="Education Reference (Optional)"
          value={formData.educationReference || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Academic Achievements*</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedAchievements.map((achievement) => (
            <span key={achievement} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {achievement}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeAchievement(achievement)} />
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600"
            onClick={() => addAchievement("College topper")}
          >
            College topper +
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600"
            onClick={() => addAchievement("Department topper")}
          >
            Department topper +
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600"
            onClick={() => addAchievement("Top 3 in class")}
          >
            Top 3 in class +
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600"
            onClick={() => addAchievement("Top 10 in class")}
          >
            Top 10 in class +
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600"
            onClick={() => addAchievement("Gold medalist")}
          >
            Gold medalist +
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600"
            onClick={() => addAchievement("Received scholarship")}
          >
            Received scholarship +
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600"
            onClick={() => addAchievement("All rounder")}
          >
            All rounder +
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600"
            onClick={() => addAchievement("Other")}
          >
            Other +
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Received during B.Tech/B.E.*</Label>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderEntranceExamForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Competitive exams are capturing your achievements in exams that demonstrate skills, 
        knowledge, or qualifications for academic or professional growth.
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Exam Name*</Label>
        <Select onValueChange={(value) => handleSelectChange('examName', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Exam Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CAT">CAT</SelectItem>
            <SelectItem value="XAT">XAT</SelectItem>
            <SelectItem value="MBA CET">MBA CET</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Exam Year*</Label>
        <Select onValueChange={(value) => handleSelectChange('examYear', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Exam Year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Score/ Percentile*</Label>
        <div className="flex gap-2">
          <Input
            name="obtainedScore"
            placeholder="Obtained Score/percentile"
            value={formData.obtainedScore || ""}
            onChange={handleChange}
            className="flex-1"
          />
          <Input
            name="maximumScore"
            placeholder="Maximum Score/percentile"
            value={formData.maximumScore || ""}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
      </DialogFooter>
    </form>
  );

  const renderInternshipsForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Internships allow you to showcase any hands-on work experience you've gained during your 
        studies, this helps employers recognize your practical skills and potential for the role you're 
        applying for.
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Company Name*</Label>
        <Input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Internship Role*</Label>
        <Input
          name="internshipRole"
          placeholder="Internship Role"
          value={formData.internshipRole || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Internship Duration*</Label>
        <div className="flex gap-2 items-center">
          <Input
            name="internshipStartDate"
            placeholder="MM/YYYY"
            value={formData.internshipStartDate || ""}
            onChange={handleChange}
            className="flex-1"
          />
          <span className="text-sm">To</span>
          <Input
            name="internshipEndDate"
            placeholder="MM/YYYY"
            value={formData.internshipEndDate || ""}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Internship Project Name*</Label>
        <Input
          name="internshipProjectName"
          placeholder="Internship Project Name"
          value={formData.internshipProjectName || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Describe what you did at the Internship*</Label>
        <Textarea
          name="internshipDescription"
          placeholder="Describe what you did at the Internship"
          value={formData.internshipDescription || ""}
          onChange={handleChange}
          className="min-h-24"
        />
        <div className="text-xs text-gray-500 text-right">
          Up to 0-300 characters only
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Used in Internship</Label>
        <Input
          name="internshipSkills"
          placeholder="Used in Internship"
          value={formData.internshipSkills || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Internship Project URL (Optional)</Label>
        <Input
          name="internshipProjectUrl"
          placeholder="Internship Project URL (Optional)"
          value={formData.internshipProjectUrl || ""}
          onChange={handleChange}
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
      </DialogFooter>
    </form>
  );

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
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="text-sm text-gray-600 mb-4">
        Highlighting your academic qualifications, degrees, and certifications to showcasing 
        your expertise and boosting your chances of finding the right opportunity.
      </div>

      <div className="space-y-2">
        <Label htmlFor="education" className="text-sm font-medium">Add Education*</Label>
        <Select onValueChange={(value) => handleSelectChange('educationLevel', value)}>
          <SelectTrigger className="w-full">
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
          {(formData.educationLevel === "10th" || formData.educationLevel === "12th") && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Examination Board*</Label>
                <Select onValueChange={(value) => handleSelectChange('examinationBoard', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Examination Board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="State Board">State Board</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Percentage/CGPA* ( CGPA Out of 10 , GPA out of 4, Percentage, course Require Pass)</Label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="scoreType" 
                      value="percentage"
                      checked={formData.scoreType === 'percentage'}
                      onChange={handleChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Percentage</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="scoreType" 
                      value="cgpa"
                      checked={formData.scoreType === 'cgpa'}
                      onChange={handleChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">CGPA/GPA</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Acquired"
                    name="acquiredScore"
                    value={formData.acquiredScore || ""}
                    onChange={handleChange}
                    className="w-24"
                  />
                  <span className="flex items-center text-sm">Out of</span>
                  <Select onValueChange={(value) => handleSelectChange('totalScore', value)}>
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Total" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Year*</Label>
                <Select onValueChange={(value) => handleSelectChange('passingYear', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {(formData.educationLevel === "Graduate" || formData.educationLevel === "Post Graduate") && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Course Name*</Label>
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
                    <SelectItem value="MSc">MSc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Specialization*</Label>
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
                <Label className="text-sm font-medium">Percentage/CGPA* ( CGPA Out of 10 , GPA out of 4, Percentage, course Require Pass)</Label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="scoreType" 
                      value="percentage"
                      checked={formData.scoreType === 'percentage'}
                      onChange={handleChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Percentage</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="scoreType" 
                      value="cgpa"
                      checked={formData.scoreType === 'cgpa'}
                      onChange={handleChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">CGPA/GPA</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Acquired"
                    name="acquiredScore"
                    value={formData.acquiredScore || ""}
                    onChange={handleChange}
                    className="w-24"
                  />
                  <span className="flex items-center text-sm">Out of</span>
                  <Select onValueChange={(value) => handleSelectChange('totalScore', value)}>
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Total" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CGPA out of 10">CGPA out of 10</SelectItem>
                      <SelectItem value="GPA out of 4">GPA out of 4</SelectItem>
                      <SelectItem value="GPA out of 5">GPA out of 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Institute / University Name*</Label>
                <Input
                  name="institution"
                  placeholder="Institute / University Name"
                  value={formData.institution || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Course Duration*</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    name="startYear"
                    placeholder="MM/YYYY"
                    value={formData.startYear || ""}
                    onChange={handleChange}
                    className="w-32"
                  />
                  <span>To</span>
                  <Input
                    name="endYear"
                    placeholder="MM/YYYY"
                    value={formData.endYear || ""}
                    onChange={handleChange}
                    className="w-32"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Course Type*</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="courseType" 
                      value="fullTime"
                      checked={formData.courseType === 'fullTime'}
                      onChange={handleChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Full Time</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="courseType" 
                      value="partTime"
                      checked={formData.courseType === 'partTime'}
                      onChange={handleChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Part Time</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="courseType" 
                      value="distanceLearning"
                      checked={formData.courseType === 'distanceLearning'}
                      onChange={handleChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Distance Learning</span>
                  </label>
                </div>
              </div>
            </>
          )}
        </>
      )}

      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
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
        case "employment":
          return [
            { name: "company", label: "Company", type: "text", required: true, placeholder: "ABC Corporation" },
            { name: "position", label: "Position", type: "text", required: true, placeholder: "Software Developer" },
            { name: "startDate", label: "Start Date", type: "date", required: true },
            { name: "endDate", label: "End Date", type: "date" },
            { name: "description", label: "Description", type: "textarea", placeholder: "Describe your responsibilities and achievements" },
          ];
        case "accomplishments":
          return [
            { name: "title", label: "Title", type: "text", required: true, placeholder: "Award/Achievement" },
            { name: "issuer", label: "Issuer/Organization", type: "text", placeholder: "Organization Name" },
            { name: "date", label: "Date", type: "date" },
            { name: "description", label: "Description", type: "textarea", placeholder: "Describe your accomplishment" },
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
        
        {type === "personalDetails" && renderPersonalDetailsForm()}
        {type === "employment" && renderEmploymentHistoryForm()}
        {type === "accomplishments" && renderAccomplishmentsForm()}
        {type === "careerPreferences" && renderCareerPreferencesForm()}
        {type === "education" && renderEducationForm()}
        {type === "keySkills" && renderKeySkillsForm()}
        {type === "languages" && renderLanguagesForm()}
        {type === "summary" && renderProfileSummaryForm()}
        {type === "projects" && renderProjectsForm()}
        {type === "academicAchievements" && renderAcademicAchievementsForm()}
        {type === "exams" && renderEntranceExamForm()}
        {type === "internships" && renderInternshipsForm()}
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDetailDialog;
