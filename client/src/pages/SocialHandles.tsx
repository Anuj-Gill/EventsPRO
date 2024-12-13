import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
import { IconType } from 'react-icons';
import { FaInstagram, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { addSocialHandleApi, getSocialHandlesApi } from '../api/committeeApi';

// Type Definitions
interface SocialPlatform {
  key: string;
  label: string;
  icon: IconType;
  color: string;
  gradient: string;
}

interface SocialHandle {
  platform: string;
  handle: string;
}

// Social Platform Definitions with Icons and Colors
const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    key: 'instagram',
    label: 'Instagram',
    icon: FaInstagram,
    color: 'bg-gradient-to-r from-[#FEAE96] via-[#FD5948] to-[#CD486B]',
    gradient: 'from-[#FEAE96] via-[#FD5948] to-[#CD486B]'
  },
  {
    key: 'website',
    label: 'Website',
    icon: FaGlobe,
    color: 'bg-blue-600',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    key: 'x',
    label: 'X (Twitter)',
    icon: FaTwitter,
    color: 'bg-black',
    gradient: 'from-black to-gray-800'
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: FaLinkedin,
    color: 'bg-blue-700',
    gradient: 'from-blue-600 to-blue-800'
  }
];

const SocialHandles: React.FC = () => {
  // State Management
  const [socialHandles, setSocialHandles] = useState<SocialHandle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentHandle, setCurrentHandle] = useState<SocialHandle>({
    platform: '',
    handle: ''
  });

  // Fetch Social Handles on Component Mount
  useEffect(() => {
    const fetchSocialHandles = async () => {
      setIsLoading(true);
      try {
        console.log("fetching sc from db");
        const response = await getSocialHandlesApi();
        console.log(response);
        setSocialHandles(response.data.socialHandles);
      } catch (err) {
        setError('Failed to fetch social handles');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialHandles();
  }, []);

  // Open modal for adding/editing handle
  const openModal = (handle?: SocialHandle) => {
    if (handle) {
      setCurrentHandle(handle);
    } else {
      setCurrentHandle({
        platform: '',
        handle: ''
      });
    }
    setIsModalOpen(true);
  };

  // Save social handle
  const saveHandle = async () => {
    if (!currentHandle.platform || !currentHandle.handle) {
      setError('Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      await addSocialHandleApi(currentHandle);

      // Refresh the list after adding
      const response = await getSocialHandlesApi();
      console.log(response)
      setSocialHandles(response.data.socialHandles);

      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      setError('Failed to save social handle');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Render Social Handle Icon
  const renderSocialIcon = (platform: string) => {
    const platformConfig = SOCIAL_PLATFORMS.find((p) => p.label === platform);
    const Icon = platformConfig?.icon || FaGlobe;

    return (
      <div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center 
          bg-gradient-to-br ${platformConfig?.gradient || 'from-gray-600 to-gray-800'}
          shadow-lg
        `}
      >
        <Icon className="text-white w-6 h-6" />
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white p-6 pt-20">
      <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Social Media Connections
          </h1>
          <button
            onClick={() => openModal()}
            className="
              flex items-center gap-2 px-4 py-2 
              bg-gradient-to-r from-purple-600 to-indigo-600 
              hover:from-purple-700 hover:to-indigo-700 
              text-white rounded-lg transition-all duration-300
            "
          >
            <PlusIcon className="w-5 h-5" />
            Add Handle
          </button>
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="text-center py-12 text-gray-400">
            Loading social handles...
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 text-center">
            {error}
          </div>
        )}

        {/* Social Handles List */}
        {!isLoading && socialHandles.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No social handles added yet. Click "Add Handle" to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {socialHandles.map((handle, index) => (
              <div
                key={index}
                className="
                  p-6 flex items-center justify-between 
                  hover:bg-gray-800/50 transition-colors duration-300
                "
              >
                <div className="flex items-center space-x-4">
                  {renderSocialIcon(handle.platform)}
                  <div>
                    <p className="font-semibold text-lg">{handle.platform}</p>
                    <a
                      href={handle.handle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      {handle.handle}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Adding/Editing Handle */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          >
            {/* Modal Container */}
            <div
              className="
                bg-gray-900 rounded-2xl 
                w-full max-w-md 
                shadow-2xl border border-gray-800
                overflow-y-auto max-h-[90vh] mt-56
              "
            >
              {/* Modal Header */}
              <div
                className="
                  bg-gradient-to-r from-indigo-600 to-purple-600 
                  p-6 text-white
                "
              >
                <h2 className="text-xl font-bold">
                  Add New Handle
                </h2>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2">Platform</label>
                  <select
                    value={currentHandle.platform}
                    onChange={(e) =>
                      setCurrentHandle({
                        ...currentHandle,
                        platform: e.target.value
                      })
                    }
                    className="
                      w-full bg-gray-800 text-white 
                      p-3 rounded-lg border border-gray-700
                      focus:ring-2 focus:ring-indigo-500
                    "
                  >
                    <option value="">Select Platform</option>
                    {SOCIAL_PLATFORMS.map((platform) => (
                      <option key={platform.key} value={platform.label}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">URL</label>
                  <input
                    type="text"
                    value={currentHandle.handle}
                    onChange={(e) =>
                      setCurrentHandle({
                        ...currentHandle,
                        handle: e.target.value
                      })
                    }
                    placeholder="https://platform.com/profile"
                    className="
                      w-full bg-gray-800 text-white 
                      p-3 rounded-lg border border-gray-700
                      focus:ring-2 focus:ring-indigo-500
                    "
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div
                className="
                  bg-gray-800 p-4 
                  flex justify-end space-x-4
                "
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="
                    text-gray-400 hover:text-white 
                    px-4 py-2 rounded-lg 
                  "
                >
                  Cancel
                </button>
                <button
                  onClick={saveHandle}
                  disabled={isLoading}
                  className="
                    bg-gradient-to-r from-indigo-600 to-purple-600 
                    hover:from-indigo-700 hover:to-purple-700 
                    text-white px-6 py-2 rounded-lg
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialHandles;
