
import { useState } from "react";

const categories = [
  { name: "HR", count: 50, bgColor: "bg-[#FFF2E5]" },
  { name: "Developer", count: 120, bgColor: "bg-[#E5F7E8]" },
  { name: "Designer", count: 90, bgColor: "bg-[#FFF8E5]" },
  { name: "SEO", count: 40, bgColor: "bg-[#F2E8FF]" },
  { name: "Marketing", count: 70, bgColor: "bg-[#E5F1FF]" },
  { name: "Data Entry", count: 220, bgColor: "bg-[#E5FFF8]" },
];

interface JobCategoriesProps {
  onCategorySelect?: (category: string) => void;
}

const JobCategories = ({ onCategorySelect }: JobCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    const newSelected = selectedCategory === categoryName ? null : categoryName;
    setSelectedCategory(newSelected);
    
    if (onCategorySelect) {
      onCategorySelect(newSelected || "");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`
              ${category.bgColor}
              ${selectedCategory === category.name ? "ring-2 ring-blue-500" : ""}
              rounded-lg p-3 flex flex-col transition-all hover:shadow-md cursor-pointer
            `}
            onClick={() => handleCategoryClick(category.name)}
          >
            <span className="font-medium">{category.name}</span>
            <span className="text-sm text-gray-600">{category.count} jobs</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
