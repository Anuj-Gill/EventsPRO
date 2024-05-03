import { useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar';
import { useState, useEffect } from 'react';
import bgImage from '../assets/bg.png';

export function HeadHome() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        }
    }), []

    return (
        <div className="h-screen w-screen overflow-hidden" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            {loggedIn ?
                <div>
                    <Navbar />
                    <div className='h-screen flex flex-col justify-center items-center'>
                        <h2 className='text-7xl text-white font-bold mb-12'>Hello Head</h2>
                        <div className='mt-4'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-6 rounded' onClick={() => navigate("/eventform")}>Create Event</button>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-6 rounded' onClick={() => navigate('/headevents')}>Manage Events</button>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => navigate('/committees')}>Register</button>
                        </div>
                    </div>

                </div>
                :
                <div className='mt-16'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => navigate('/login')}>Log In</button> First
                </div>
            }
        </div>
    )
}
