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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl z-0">
            {approved.map((event) => (
              <div key={event._id} className="bg-white  text-black shadow-lg rounded-lg overflow-hidden border-4 backdrop-blur">
                <div className="p-4">
                  <div className="text-2xl font-bold mb-2">{event.committee}</div>
                  <div className="text-xl  mb-2 font-semibold">{event.eventName}</div>
                  <div className="flex justify-between items-center  my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                    <div className="text-sm ml-1">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                  <div className='flex my-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div className="text-sm text-black ml-1">{event.time}</div>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <button
                    onClick={() => navigate('/studentreview', { state: { data: event } })}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out"
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