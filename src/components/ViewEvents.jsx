import { Navbar } from './Navbar';
import bgImage from '../assets/bg.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ViewEvents() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedData = location.state?.data;
  const [loggedIn, setLoggedIn] = useState(false);
  const [approved, setApproved] = useState([]);

  console.log(passedData);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    async function handleFetch() {
      try {
        const req = await fetch('http://localhost:5000/admin/fetchEvents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ committee: passedData }),
        });
        const res = await req.json();
        console.log(res);
        setApproved(res.approvedEvents);
      } catch (error) {
        // Handle error
      }
    }
    handleFetch();
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div
          className="min-h-screen bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <Navbar />
          <h1 className="text-3xl font-bold mb-8 text-center">{passedData.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
            {approved.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="text-gray-700 font-semibold text-2xl mb-2">
                    {event.committee}
                  </div>
                  <div className="text-gray-600 text-lg">{event.eventName}</div>
                </div>
                <div className="p-4 bg-gray-100">
                  <button
                    onClick={() =>
                      navigate('/studentreview', { state: { data: event } })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
}