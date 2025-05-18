
const categories = [
  { name: "HR", count: 50 },
  { name: "Developer", count: 120 },
  { name: "Designer", count: 90 },
  { name: "SEO", count: 40 },
  { name: "Marketing", count: 70 },
  { name: "Data Entry", count: 220 },
];

const JobCategories = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`
              ${category.name === "HR" ? "bg-[#FFF2E5]" : ""}
              ${category.name === "Developer" ? "bg-[#E5F7E8]" : ""}
              ${category.name === "Designer" ? "bg-[#FFF8E5]" : ""}
              ${category.name === "SEO" ? "bg-[#F2E8FF]" : ""}
              ${category.name === "Marketing" ? "bg-[#E5F1FF]" : ""}
              ${category.name === "Data Entry" ? "bg-[#E5FFF8]" : ""}
              rounded-lg p-3 flex flex-col transition-all hover:shadow-md
            `}
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
