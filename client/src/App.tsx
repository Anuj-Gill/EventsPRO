import React from 'react';
import { RecoilRoot, useRecoilValue } from "recoil";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { loggedinStatusState } from './store/atoms/LoginStatus';
import UnauthorizedPage from '../src/pages/UnauthorizedPage';

// Importing all pages
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LandingPage2 from './pages/LandingPage2';
import AcademicInfoPage from './pages/AcademicInfoPage';
import Dashboard from './pages/Dashboard';
import Navbar from "./components/Navbar";
import VerifyAccountPage from './pages/VerifyAccountPage';
import TestPage from './pages/TestPage';
import CommitteePage from "./pages/CommitteePage";
import CommitteeDashboard from "./pages/CommitteeDashboard";
import CreateEvent from "./pages/CreateEvent";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetaisPage";
import Attendance from './pages/Attendance';
import CommitteeProfile from './pages/CommitteeProfile';
import CommitteePubs from './pages/CommitteePubs';
import CommitteeMembers from './pages/CommitteeMembers';
import CommitteeEvents from './pages/CommitteeEvents';
import UpdateEvent from './pages/UpdateEvents';
import EventStats from './pages/EventStats';
import UserProfile from './pages/UserProfile';
import SocialHandles from './pages/SocialHandles';
import { RegistrationSuccessPage } from './pages/RegistrationSuccessPage';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const loggedIn = useRecoilValue(loggedinStatusState);
  const token = localStorage.getItem('token');

  if (!loggedIn || !token) {
    return <UnauthorizedPage />;
  }

  return children;
};

function App() {
  return (
    <RecoilRoot>
      <div className="min-h-screen z-0 bg-gray-950 text-white relative overflow-hidden pt-16">
        {/* Background Gradient Animations */}
        <div className="absolute z-0 inset-0 overflow-hidden animate-gradient-move">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/30 rounded-full filter blur-3xl animate-gradient-move" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full filter blur-3xl animate-gradient-move delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/20 rounded-full filter blur-3xl animate-gradient-move delay-4000" />
        </div>
        {/* Main Content */}
        <div className="relative z-10">
          <Router>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<LandingPage2 />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify/account" element={<VerifyAccountPage />} />
              <Route path="/event/info" element={<EventDetailsPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/academic_info"
                element={
                  <ProtectedRoute>
                    <AcademicInfoPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/testpage"
                element={
                  <ProtectedRoute>
                    <TestPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/committees"
                element={
                  <ProtectedRoute>
                    <CommitteePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/committeedashboard"
                element={
                  <ProtectedRoute>
                    <CommitteeDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/committee/create-event"
                element={
                  <ProtectedRoute>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/committee/profile"
                element={
                  <ProtectedRoute>
                    <CommitteeProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/committee/publicity"
                element={
                  <ProtectedRoute>
                    <CommitteePubs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/committee/members"
                element={
                  <ProtectedRoute>
                    <CommitteeMembers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/committee/events"
                element={
                  <ProtectedRoute>
                    <CommitteeEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/committee/socialhandles"
                element={
                  <ProtectedRoute>
                    <SocialHandles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/committee/event/update"
                element={
                  <ProtectedRoute>
                    <UpdateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <EventsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event/stats"
                element={
                  <ProtectedRoute>
                    <EventStats />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event/register/success"
                element={
                  <ProtectedRoute>
                    <RegistrationSuccessPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance/verify"
                element={
                  <ProtectedRoute>
                    <Attendance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              {/* Optional: Catch-all route for undefined paths */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
