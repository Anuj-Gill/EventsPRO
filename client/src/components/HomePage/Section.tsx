const Section = ({ title, children, viewAllLink }: { title: string; children: React.ReactNode; viewAllLink?: string }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-purple-400 hover:underline">
            View All &gt;
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
};

export default Section;
