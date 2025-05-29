
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Bookmark, Share2 } from "lucide-react";

interface JobDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    experience: string;
    salary: string;
    description: string;
    requirements: string[];
    skills: string[];
    type: string;
  } | null;
}

const JobDetailModal = ({ open, onOpenChange, job }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-orange-50 p-6 border-b">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-black text-white w-10 h-10 rounded flex items-center justify-center font-bold">
                {job.company.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2" onClick={() => onOpenChange(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <span>📍 {job.location}</span>
            <span>💼 {job.experience}</span>
            <span>💰 {job.salary}</span>
            <span>⏰ {job.type}</span>
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Apply
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Job description</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
