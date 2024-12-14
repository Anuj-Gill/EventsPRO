import React, { useState, useEffect } from "react";
import { Calendar, Trophy, Users, Star, Lock } from "lucide-react";
import { getUserStatsApi } from "../api/userApi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Helpers/Loading";

interface EventRegistration {
  id: number;
  eventId: number;
  registrationDate: string;
  hasAttended: boolean;
  teamCode: string | null;
  event: {
    id: number;
    eventName: string;
    dateTime: string;
    venue: string;
    about: string;
    isOnline: boolean;
    team: boolean;
    committeeId: number;
    eventPoster: string;
  };
}

const UserStats: React.FC = () => {
  const [userData, setUserData] = useState<EventRegistration[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [committeeEvents, setCommitteeEvents] = useState<number[]>([]);
  const [isTrophyModalOpen, setIsTrophyModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const trophyLevels = [
    { level: 'Bronze', threshold: 10, color: 'text-amber-500' },
    { level: 'Silver', threshold: 25, color: 'text-gray-300' },
    { level: 'Gold', threshold: 50, color: 'text-yellow-300' }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getUserStatsApi();
      setUserData(response?.data?.userStats);
      setTotalEvents(response?.data?.totalEvents);

      // Group committee events
      const committees = response?.data?.userStats.reduce((acc: number[], event) => {
        if (!acc.includes(event.event.committeeId)) {
          acc.push(event.event.committeeId);
        }
        return acc;
      }, []);
      setCommitteeEvents(committees);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCurrentTrophyLevel = () => {
    const registeredEventsCount = userData.length;

    if (registeredEventsCount >= 50) return 2; // Gold
    if (registeredEventsCount >= 25) return 1; // Silver
    if (registeredEventsCount >= 10) return 0; // Bronze
    return -1; // No trophy
  };

  const getCurrentTrophyProgress = () => {
    const registeredEventsCount = userData.length;
    const currentLevel = getCurrentTrophyLevel();

    if (currentLevel === -1) {
      return {
        currentLevel: 'No Trophy',
        progress: (registeredEventsCount / 10) * 100,
        nextLevel: 'Bronze',
        eventsNeeded: 10 - registeredEventsCount
      };
    }

    const level = trophyLevels[currentLevel];
    const previousThreshold = currentLevel > 0 ? trophyLevels[currentLevel - 1].threshold : 0;
    const nextLevel = currentLevel < 2 ? trophyLevels[currentLevel + 1] : null;

    return {
      currentLevel: level.level,
      progress: nextLevel
        ? ((registeredEventsCount - previousThreshold) / (nextLevel.threshold - previousThreshold)) * 100
        : 100,
      nextLevel: nextLevel ? nextLevel.level : null,
      eventsNeeded: nextLevel ? nextLevel.threshold - registeredEventsCount : 0
    };
  };

  const trophyProgress = getCurrentTrophyProgress();

  if (loading) {
    return <Loading text="Fetching your details..." />;
  }

  return (
    <div className="min-h-screen z-0 text-white relative overflow-hidden pt-16">
      {/* Trophy Progress Tracker */}
      <div
        className="absolute top-4 right-6 z-20 cursor-pointer"
        onClick={() => setIsTrophyModalOpen(true)}
      >
        <div className="relative w-56 h-12 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center">
          <div className="absolute flex pl-10 space-x-10 justify-between">
            {trophyLevels.map((trophy, index) => (
              <Trophy
                key={trophy.level}
                className={`h-6 w-6 ${trophy.color}`}
              />
            ))}
          </div>
          <div
            className="absolute top-full mt-2 w-56 h-1 bg-gray-800 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-purple-600"
              style={{ width: `${Math.min(trophyProgress.progress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Trophy Progress Modal */}
      {isTrophyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsTrophyModalOpen(false)}
        >
          <div
            className="bg-gray-900 rounded-2xl w-96 p-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Trophy Progress
              </h2>

              {/* Current Trophy */}
              <div className="flex items-center mb-4">
                <Trophy className={`h-12 w-12 ${trophyLevels[Math.max(0, getCurrentTrophyLevel())].color} mr-4`} />
                <div>
                  <p className="text-lg font-semibold">
                    {trophyProgress.currentLevel}
                  </p>
                  <p className="text-sm text-gray-400">
                    {userData.length} events completed
                  </p>
                </div>
              </div>

              {/* Next Trophy Progress */}
              {trophyProgress.nextLevel && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Next: {trophyProgress.nextLevel} Trophy</span>
                    <span className="text-sm text-white">
                      {trophyProgress.eventsNeeded} more events
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600"
                      style={{ width: `${Math.min(trophyProgress.progress, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Next Level Benefits */}
              <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
                <h3 className="text-lg font-semibold mb-2">Next Level Perks</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-purple-500 mr-2" />
                    Personalized Event Notifications
                  </li>
                  <li className="flex items-center">
                    <Trophy className="h-4 w-4 text-blue-500 mr-2" />
                    Special Recognition
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto p-6 space-y-6 relative z-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Registered Events Card */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-lg transform transition-all hover:scale-105">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-400">Registered Events</h3>
              <Trophy className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-white">
              {userData.length} / {totalEvents}
            </div>
            <p className="text-xs text-gray-500">Events you've registered for</p>
          </div>

          {/* Committees Card */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-lg transform transition-all hover:scale-105">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-400">Committees</h3>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-white">
              {committeeEvents.length}
            </div>
            <p className="text-xs text-gray-500">Unique committees you've joined</p>
          </div>

          {/* Attendance Card */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-lg transform transition-all hover:scale-105">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-400">Attendance</h3>
              <Calendar className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-white">
              {userData.filter(event => event.hasAttended).length}
            </div>
            <p className="text-xs text-gray-500">Events you've attended</p>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Registered Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/30">
                <tr>
                  {['Event Name', 'Date', 'Venue', 'Registration', 'Status'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userData.map((registration) => (
                  <tr
                    onClick={() => navigate(`/event/info?eventName=${registration.event.eventName}`)}
                    key={registration.id}
                    className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {registration.event.eventName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {format(new Date(registration.event.dateTime), 'PP')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {registration.event.venue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {format(new Date(registration.registrationDate), 'PP')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${registration.hasAttended
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-purple-500/20 text-purple-400'
                          }`}
                      >
                        {registration.hasAttended ? 'Attended' : 'Registered'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
