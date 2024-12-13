import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { loggedinStatusState } from '../store/atoms/LoginStatus';
import { profilePicState } from '../store/atoms/ProfilePicState';
import { ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import GitHubStars from './Helpers/GithubStars';

const Navbar = () => {
  const [loggedIn, setLoggedInStatus] = useRecoilState(loggedinStatusState);
  const userImageUrl = useRecoilValue(profilePicState);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log(userImageUrl);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setLoggedInStatus(false);
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/40 backdrop-blur-sm border-b border-white/10 text-white py-4 lg:px-16 px-4 flex justify-between items-center z-50">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-purple-500/10 rounded flex items-center justify-center">
          <img src='https://static.thenounproject.com/png/3087896-200.png' className="w-10 h-8 bg-white rounded-md" />
        </div>
        <span
          className="text-xl font-bold cursor-pointer hover:text-purple-300 transition-colors"
          onClick={() => navigate("/")}
        >
          EventsPRO
        </span>
      </div>

      <div className="flex items-center space-x-4 md:space-x-8">
        {!loggedIn ? (
          <>
            <GitHubStars repoUrl="https://github.com/Anuj-Gill/Doodle_Wars" />
            <a
              onClick={() => navigate('/login')}
              className="font-semibold text-gray-500 hover:text-white duration-200 cursor-pointer"
            >
              Log In
            </a>
            <a
              onClick={() => navigate('/signup')}
              className="font-semibold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer"
            >
              Sign Up
            </a>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <a
              onClick={() => navigate('/dashboard')}
              className="font-semibold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer flex items-center space-x-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </a>
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800/50 px-2 rounded-lg transition-all"
              >
                {userImageUrl ? (
                  <img
                    src={userImageUrl}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-purple-300" />
                  </div>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-gray-300 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-white/10 overflow-hidden">
                  <div
                    onClick={() => {
                      navigate('/user/profile');
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-700/50 flex items-center space-x-2 cursor-pointer transition-colors"
                  >
                    <User className="w-4 h-4 text-purple-300" />
                    <span>Profile</span>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-3 hover:bg-gray-700/50 flex items-center space-x-2 cursor-pointer transition-colors text-red-400 hover:text-red-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
