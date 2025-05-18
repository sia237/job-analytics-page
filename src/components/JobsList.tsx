
import { Job } from "../types/job";

interface JobCardProps {
  job: Job;
  onJobClick: (job: Job) => void;
}

const JobCard = ({ job, onJobClick }: JobCardProps) => {
  return (
    <div 
      className="bg-[#FFF2E5] rounded-lg p-4 relative cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onJobClick(job)}
    >
      <button className="absolute top-4 right-4 text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <div className="flex items-start gap-3">
        <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-md">
          a
        </div>
        <div>
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <p className="text-gray-700">{job.company}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-white px-2 py-1 text-xs rounded">{job.location}</span>
          <span className="bg-violet-100 text-violet-800 px-2 py-1 text-xs rounded">{job.type}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Experience: </span>
          <span>{job.experience}</span>
        </div>
        
        <div className="flex items-center flex-wrap gap-2 mt-2">
          {job.skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t flex justify-between items-center">
        <div className="font-bold">{job.salary}</div>
        <button className="bg-blue-600 text-white px-4 py-1 text-sm rounded">
          Apply
        </button>
      </div>
      
      <p className="text-xs text-gray-500 absolute bottom-2 left-4">{job.postedDate}</p>
    </div>
  );
};

interface JobsListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

const JobsList = ({ jobs, onJobClick }: JobsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onJobClick={onJobClick} />
      ))}
    </div>
  );
};

export default JobsList;
