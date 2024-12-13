import React from "react";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="feature-card p-8 rounded-2xl bg-gray-900/40 backdrop-blur-sm hover:bg-gray-900/60 transition-transform transform hover:scale-105 shadow-lg border border-gray-800">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default FeatureCard;
