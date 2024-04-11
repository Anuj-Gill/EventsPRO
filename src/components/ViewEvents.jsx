import { Navbar } from './Navbar';
import bgImage from '../assets/bg.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ViewEvents() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }), []
  const navigate = useNavigate();

  return (
    <div>
      {loggedIn ?

        <div className="min-h-screen bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center" style={{ backgroundImage: `url(${bgImage})` }}>

          <Navbar />
          <div className="container mx-auto">
            <div className="mb-10 mt-12 pl-52">
              <h1 className="text-white text-6xl font-bold">Hello, Arkan!</h1>
            </div>
            <div className="flex flex-wrap justify-center pl-52">
              <div className="w-full mt-10 flex">
                <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md mr-52">
                  GDSC
                </button>
                <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md mr-52">
                  CSI
                </button>
                <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md">
                  ITSA
                </button>
              </div>
              <div className="w-full mb-10 flex">
                <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md mr-52 mt-28">
                  IEEE
                </button>
                <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md mt-28">
                  BEEE
                </button>
              </div>
            </div>
          </div>

        </div>
        :
        <div><button onClick={() => navigate('/login')}>Log In</button> First</div>
      }
    </div>
  );
}
