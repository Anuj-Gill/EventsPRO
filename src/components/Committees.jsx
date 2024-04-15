import { Navbar } from './Navbar';
import bgImage from '../assets/bg.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommitteesName } from './CommitteesName';
import { useLocation } from 'react-router-dom'

export default function Committees() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const passedData = location.state?.data;
  console.log(passedData);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }), []
  const navigate = useNavigate();


  return (
    <div>
      {loggedIn ?
        <div
          className="flex flex-col items-center justify-start min-h-screen pt-12"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Navbar />
          <div className="container mx-auto mt-16 w-5/6 px-4">

            <div className="mb-10 mt-12">
              <h1 className="text-white text-6xl font-bold">Hello, {passedData.name}</h1>
            </div>


            <div className="flex flex-wrap justify-between mb-8"> {/* Flex wrapper for rows with space between each button */}
            <CommitteesName name={"CSI"} logo={""}/>
            <CommitteesName name={"ITSA"} logo={""}/>
            </div>
          </div>
        </div> :
        <div><button onClick={() => navigate('/login')}>Log In</button> First</div>}

    </div>
  );
}
