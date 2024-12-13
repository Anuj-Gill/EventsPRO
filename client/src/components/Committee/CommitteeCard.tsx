import React from 'react';
import { IconBuildingCommunity } from '@tabler/icons-react'; // Example icon for fallback
import { useNavigate } from 'react-router-dom';

interface CommitteeCardProps {
  name: string;
  logoBase64?: string; // Make it optional
  bgGradient: string;
}

const CommitteeCard: React.FC<CommitteeCardProps> = ({ name, logoBase64, bgGradient }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/events?committee=${name}`)} className="group relative rounded-xl overflow-hidden cursor-pointer">
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
      <div className="relative p-6 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            {logoBase64 ? (
              <img
                src={`${logoBase64}`}
                alt={`${name} Logo`}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <IconBuildingCommunity className="w-10 h-10 text-white/50" /> // Fallback icon
            )}
          </div>
          <h3 className="font-semibold text-xl text-white">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default CommitteeCard;
