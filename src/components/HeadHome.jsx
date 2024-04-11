import { useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar';
import { useState, useEffect } from 'react';

export function HeadHome() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        }
    }), []

    return (
        <div>
            {loggedIn ?
                <div>
                    <Navbar />
                    <div className='mt-16'>
                        <h2>Hello Head</h2>
                        <div>
                            <button onClick={() => navigate("/eventform")}>Create Event</button>
                            <button>Manage Events</button>
                            <button onClick={() => navigate('/committees')}>Register</button>
                        </div>
                    </div>
                </div>
                :
                <div><button onClick={() => navigate('/login')}>Log In</button> First</div>
            }
        </div>
    )
}