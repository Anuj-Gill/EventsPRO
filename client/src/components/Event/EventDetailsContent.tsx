import React, { useState } from 'react';
import {
  CalendarDays,
  MapPin,
  Users,
  Trophy,
  Globe,
  UserPlus,
  Users as UsersIcon,
  TicketCheck,
  Phone,
  UserCircle2,
  Share2,
  X,
  Copy
} from 'lucide-react';
import { IconType } from 'react-icons';
import { FaInstagram, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { Event } from '../../interfaces/eventInterface';
import { useNavigate } from 'react-router-dom';

// Define a type for the publicity team member
type PublicityMember = {
  name: string;
  contact: string;
};

type SocialHandle = {
  platform: string;
  handle: string;
}

// Social Platform Mapping
const SOCIAL_PLATFORMS = {
  'Instagram': { icon: FaInstagram, color: 'bg-gradient-to-r from-[#FEAE96] via-[#FD5948] to-[#CD486B]' },
  'Website': { icon: FaGlobe, color: 'bg-blue-600' },
  'X (Twitter)': { icon: FaTwitter, color: 'bg-black' },
  'LinkedIn': { icon: FaLinkedin, color: 'bg-blue-700' }
};


interface EventDetailsContentProps {
  event: Event;
  teamAction: 'create' | 'join' | null;
  setTeamAction: React.Dispatch<React.SetStateAction<'create' | 'join' | null>>;
  register: (() => Promise<void>) | null;
  registered: boolean;
  qrCode: string;
  createTeam: (() => Promise<void>) | null;
  setTeamCode: React.Dispatch<React.SetStateAction<string>>;
  teamCode: string;
  teamMembers: string[];
  loginButton?: React.ReactNode;
  pubs?: PublicityMember[]; // Publicity team members
  socialHandles?: SocialHandle[];
}

const EventDetailsContent: React.FC<EventDetailsContentProps> = ({
  event,
  teamAction,
  setTeamAction,
  register,
  registered,
  qrCode,
  createTeam,
  setTeamCode,
  teamCode,
  teamMembers,
  loginButton,
  pubs = [], // Default to empty array if not provided
  socialHandles = [],
}) => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleViewTicket = () => {
    navigate("/event/register/success", {
      state: {
        eventName: event.eventName,
        qrCode,
        teamCode,
        teamMembers,
      },
    });
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCopyLink = () => {
    const eventLink = window.location.href;
    navigator.clipboard.writeText(eventLink).then(() => {
      alert('Event link copied to clipboard!');
      setIsShareModalOpen(false);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const ShareModal = () => {
    if (!isShareModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-gray-800 rounded-xl p-6 w-96 relative">
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-purple-300">Share Event</h2>

          <p className="text-white/80 mb-4">
            Share this event with friends and colleagues by copying the link below:
          </p>

          {/* Copy Link Section */}
          <div className="bg-gray-700 rounded-lg p-3 flex items-center">
            <input
              type="text"
              readOnly
              value={window.location.href}
              className="bg-transparent w-full text-white outline-none mr-2 truncate"
            />
            <button
              onClick={handleCopyLink}
              className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition-colors"
            >
              <Copy className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  };


  const renderSocialHandles = () => {
    if (socialHandles.length === 0) return null;

    return (
      <div className="bg-gray-800/50 flex items-center p-4 rounded-xl">
        <h3 className="text-xl font-semibold mr-4 text-purple-300">
          Committee Social Handles:
        </h3>
        <div className="flex items-center gap-4">
          {socialHandles.map((social, index) => {
            const platformConfig = SOCIAL_PLATFORMS[social.platform as keyof typeof SOCIAL_PLATFORMS];

            if (!platformConfig) return null;

            const Icon = platformConfig.icon;

            return (
              <a
                key={index}
                href={social.handle}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center 
                  ${platformConfig.color}
                  hover:opacity-80 transition-opacity
                  shadow-lg
                `}
              >
                <Icon className="text-white w-6 h-6" />
              </a>
            );
          })}
        </div>
      </div>
    );

  }


  return (
    <div className="relative">
      <ShareModal />
      <div className="relative z-10 container mx-auto px-4 pt-6">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="space-y-8 md:-mt-20">
            <div className='flex space-x-4 items-center'>
              <h1 className="text-4xl mb-2 font-bold bg-clip-text text-white bg-gradient-to-r from-purple-400 to-blue-600">
                {event.eventName}
              </h1>
              <button
                onClick={handleShareClick}
                className="text-white hover:text-purple-300 transition-colors flex items-center gap-2"
                title="Share Event"
              >
                <Share2 className="w-7 h-7" />
                <span className="text-sm">Share</span>
              </button>

            </div>


            <div className="grid grid-cols-2 gap-4 text-white/80">
              {[
                { icon: CalendarDays, text: event.dateTime && new Date(event.dateTime).toLocaleString() },
                { icon: MapPin, text: event.venue },
                { icon: Globe, text: event.isOnline ? 'Online' : 'Offline' },
                { icon: Users, text: event.team ? 'Team Event' : 'Individual Event' },
                { icon: Trophy, text: event.prize },
              ].map(({ icon: Icon, text }, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">About the Event</h3>
              <p className="text-white/80">{event.about}</p>
            </div>

            {/* Publicity Team Section */}
            {pubs.length > 0 && (
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-purple-300">
                  Publicity Team
                </h3>
                <div className="space-y-3">
                  {pubs.map((pub, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <UserCircle2 className="w-6 h-6 text-purple-400" />
                        <span className="font-medium">{pub.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-green-400" />
                        <a
                          href={`tel:${pub.contact}`}
                          className="text-blue-300 hover:text-blue-200 transition-colors"
                        >
                          {pub.contact}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative flex flex-col items-center md:pt-10 ">

            {renderSocialHandles()}
            <div className="w-full max-w-sm aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-600/30 mt-10">
              <iframe
                src={event.eventPoster || undefined}
                className="h-full w-full object-cover"
                allow="autoplay"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-6">
          <div className="mt-6 max-w-2xl mx-auto">
            {registered ? (
              <button
                onClick={handleViewTicket}
                className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-lg transition-colors flex items-center justify-center gap-3"
              >
                <TicketCheck /> View Ticket Details
              </button>
            ) : event.team ? (
              <div className="space-y-4">
                {teamAction === null && register && createTeam ? (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setTeamAction('create');
                        createTeam();
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-4 rounded-lg flex items-center justify-center gap-3"
                    >
                      <UserPlus /> Create Team
                    </button>
                    <button
                      onClick={() => setTeamAction('join')}
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-4 rounded-lg flex items-center justify-center gap-3"
                    >
                      <UsersIcon /> Join Team
                    </button>
                  </div>
                ) : teamAction === null && loginButton ? (
                  <div className="flex space-x-4">
                    {loginButton}
                  </div>
                ) : null}

                {teamAction === 'join' && register && (
                  <div className="bg-gray-800/50 p-6 rounded-xl  space-y-4">
                    <h3 className="text-xl font-semibold text-purple-300">Join Team</h3>
                    <input
                      type="text"
                      placeholder="Team Code"
                      onChange={(e) => setTeamCode(e.target.value)}
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setTeamAction(null)}
                        className="w-full bg-gray-600 hover:bg-gray-700 py-3 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition-colors"
                        onClick={register}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : register ? (
              <button
                onClick={register}
                className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-lg transition-colors"
              >
                Register Now
              </button>
            ) : loginButton ? (
              <div className="flex justify-center">
                {loginButton}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsContent;
