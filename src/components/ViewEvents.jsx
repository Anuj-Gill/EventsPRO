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
  console.log(passedData)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }), []

  useEffect(() => {
      async function handleFetch() {
          try {
              const req = await fetch("http://localhost:5000/admin/fetchEvents", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                      "Authorization": `Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify({committee: passedData})
              })
              const res = await req.json();
              console.log(res);
              setApproved(res.approvedEvents)
          }
          catch (error) {

          }
      }
      handleFetch();
  }, []);

  return (
    <div>
      {loggedIn ?

        <div className="min-h-screen bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center" style={{ backgroundImage: `url(${bgImage})` }}>

          <Navbar />
          <h1>{passedData.name}</h1>
          <div className="flex flex-wrap">
                    {approved.map((event) => {
                        return (
                            <div key={event._id} className="bg-gray-100 p-4 rounded-md mr-4 mb-4 w-1/2 sm:w-1/3 md:w-1/4">
                                <div className="text-gray-700 font-semibold text-3xl">{event.committee}</div>
                                <div className="text-gray-500 text-lg">{event.eventName}</div>
                                <button
                                    onClick={() => navigate('/studentreview', { state: { data: event } })}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md focus:outline-none focus:shadow-outline"
                                >
                                    View Details
                                </button>
                            </div>
                        );
                    })}
                </div>

        </div>
        :
        <div><button onClick={() => navigate('/login')}>Log In</button> First</div>
      }
    </div>
  );
}
