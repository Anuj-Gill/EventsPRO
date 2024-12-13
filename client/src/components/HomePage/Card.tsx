const Card = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-200 mt-2">{description}</p>
    </div>
  );
};

export default Card;
