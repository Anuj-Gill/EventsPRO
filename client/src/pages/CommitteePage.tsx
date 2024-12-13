import React from 'react';
import { useCommittees } from '../hooks/useCommittees';
import CommitteeCard from '../components/Committee/CommitteeCard';

const colors = [
  "from-blue-500/20 to-cyan-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-yellow-500/20 to-orange-500/20",
  "from-green-500/20 to-emerald-500/20",
  "from-indigo-500/20 to-purple-500/20",
  "from-red-500/20 to-orange-500/20",
  "from-teal-500/20 to-green-500/20",
  "from-violet-500/20 to-purple-500/20",
  "from-pink-500/20 to-rose-500/20",
];

const CommitteePage: React.FC = () => {
  const { committees, loading, error } = useCommittees();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading committees.</div>;

  return (
    <div className="  px-4 py-8">
      {/* Background Gradient Animations */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
          Committees
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {committees.map((committee, index) => (
            <CommitteeCard
              key={committee.id || index}
              name={committee.committeeName}
              logoBase64={committee.committeeLogo}
              bgGradient={colors[index % colors.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitteePage;
