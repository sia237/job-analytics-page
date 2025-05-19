
import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface JobSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: FormEvent) => void;
}

const JobSearchBar = ({ searchTerm, setSearchTerm, handleSearch }: JobSearchBarProps) => {
  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search jobs, companies, or skills..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Search</Button>
      </div>
    </form>
  );
};

export default JobSearchBar;
