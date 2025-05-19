
import React from "react";
import { Job } from "../types/job";
import { Button } from "@/components/ui/button";

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FFF2E5] rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-md">
              {job.company.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-700">{job.company}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="bg-white px-2 py-1 rounded">{job.location}</span>
          <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded">{job.type}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center text-sm mb-4">
          <span className="font-medium">Experience: </span>
          <span>{job.experience}</span>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-bold">{job.salary}</div>
          <Button className="bg-blue-600 hover:bg-blue-700">Apply</Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Job description</h3>
          <p className="text-gray-700 mb-4">
            We have a Great Job Opportunity with a leading company for a {job.title} position.
          </p>
          
          <h4 className="font-semibold mt-4">Required Skills:</h4>
          <ul className="list-disc pl-6 mb-4">
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
            <li>Strong communication and collaboration skills</li>
            <li>Problem-solving mindset and attention to detail</li>
          </ul>
          
          <h4 className="font-semibold mt-4">Responsibilities:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Work with cross-functional teams to deliver high-quality products</li>
            <li>Stay up-to-date with industry trends and best practices</li>
            <li>Participate in design reviews and provide constructive feedback</li>
            <li>Contribute to the continuous improvement of our processes</li>
          </ul>
          
          <h4 className="font-semibold mt-4">Benefits:</h4>
          <ul className="list-disc pl-6">
            <li>Competitive salary and benefits package</li>
            <li>Flexible work arrangements</li>
            <li>Professional development opportunities</li>
            <li>Collaborative and inclusive work environment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
