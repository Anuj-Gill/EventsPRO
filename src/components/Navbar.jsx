import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

export function Navbar() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        }
    }), []


    return (
        <div>
                <div className="flex border-black fixed right-0 left-0 top-0 justify-between shadow-md h-12  index-2 backdrop-blur-md p-3 items-center z-100">
                    <div className="  text-[#FF8C00] font-bold text-2xl pl-3 pt-4">
                        EventsPRO
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button className="mr-3 w-32 justify-center bg-transparent text-white border-[3px] border-[#FF8C00] rounded-full py-1 px-6 flex items-center transition-all duration-300 hover:bg-[#FF8C00] hover:text-black hover:font-semibold">Home</button>
                        {loggedIn ? 
                    
                        <button className="mr-2 w-32 justify-center bg-transparent text-white border-[3px] border-[#FF8C00] rounded-full py-1 px-[4px] flex items-center transition-all duration-300 hover:bg-[#FF8C00] hover:text-black hover:font-semibold" onClick={handleLogout}>Logout</button>
                        : 
                        <>
                        </>
                        }
                    </div>
                </div>
        </div>
    )

}