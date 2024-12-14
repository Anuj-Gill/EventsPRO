import React, { useState, useEffect } from 'react';
import { roleState } from "../store/atoms/RoleState";
import { useRecoilValue } from "recoil"
import {
  IconCalendarEvent,
  IconPlus,
  IconUserCircle,
  IconUsers,
  IconUserShield,
  IconSettings,
  IconSocial
} from '@tabler/icons-react';
import { getCommitteeInfo } from '../api/committeeApi';
import HeadAccessDeniedPage from "../pages/HeadAccessDeniedPage.tsx";
import { useCommitteeEvent } from '../hooks/useCommitteeEvents';



const CommitteeDashboard: React.FC = () => {
  const role = useRecoilValue(roleState);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [denied, setDenied] = useState(false);

  const dashboardOptions = [
    {
      title: "Manage Events",
      description: "View, edit, and track all your committee events",
      icon: <IconCalendarEvent className="w-8 h-8" />,
      color: "from-blue-600/20 to-cyan-600/20",
      link: `/committee/events?committee=${info?.committeeName}`
    },
    {
      title: "Create Event",
      description: "Create and publish new events for your committee",
      icon: <IconPlus className="w-8 h-8" />,
      color: "from-green-600/20 to-emerald-600/20",
      link: "/committee/create-event"
    },
    {
      title: "Committee Profile",
      description: "Manage your committee's profile and settings",
      icon: <IconUserCircle className="w-8 h-8" />,
      color: "from-purple-600/20 to-pink-600/20",
      link: "/committee/profile"
    },
    {
      title: "Manage Pubs",
      description: "Oversee publicity team members and assignments",
      icon: <IconUsers className="w-8 h-8" />,
      color: "from-orange-600/20 to-red-600/20",
      link: "/committee/publicity"
    },
    {
      title: "Manage Committee Members",
      description: "Add or remove committee members and assign roles",
      icon: <IconUserShield className="w-8 h-8" />,
      color: "from-indigo-600/20 to-purple-600/20",
      link: "/committee/members"
    },
    {
      title: "Social Handles",
      description: "Manage all social handles of committee",
      icon: <IconSocial className="w-8 h-8" />,
      color: "from-teal-600/20 to-cyan-600/20",
      link: "/committee/socialhandles"
    }
  ];


  useEffect(() => {
    const fetchCommitteeInfo = async () => {
      try {
        const response = await getCommitteeInfo();
        setInfo(response.data.info);
        setLoading(false);

      } catch (error) {
        if (error.status == 403) {
          setDenied(true);
        }
        console.error(error);
        setError("Failed to fetch committee information");
        setLoading(false);
      }
    };

    fetchCommitteeInfo();
  }, []);

  if (denied) {
    return (
      <HeadAccessDeniedPage />
    )
  }

  return (
    <div className="relative min-h-screen px-4 py-8">
      {/* Background Gradient Animations */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-white bg-gradient-to-r from-purple-400 to-blue-600">
            Committee Dashboard
          </h1>
          <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <span className="text-white/80">{info?.committeeName}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardOptions.map((option, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => window.location.href = option.link}
            >
              <div className="relative h-full rounded-xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                <div className="relative p-6 backdrop-blur-sm border border-white/10 rounded-xl group-hover:border-white/20 transition-all h-full">
                  <div className="flex flex-col space-y-4">
                    <div className="p-3 rounded-full bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-white mb-2">
                        {option.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitteeDashboard;
