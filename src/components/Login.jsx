import bgImage from '../assets/bg.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [response, setResponse] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const req = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(loginData)
            });
            const res = await req.json();
            console.log(res);
            if (res.status) {
                setResponse(res.message);
                localStorage.setItem("token", `Bearer ${res.token}`);
                if (res.role === "head") {
                    navigate('/headhome', { state: { data: res } });
                } 
                else if (res.role === "Student") {
                    navigate('/committees', { state: { data: res } });
                }
                else {
                    navigate('/adminhome', { state: { data: res } });
                }
            } else {
                setResponse(res.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid grid-cols-4 h-screen" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            {/* Left Column with Logo and Tagline */}
            <div className="col-span-1 flex flex-col items-center justify-center transform rotate-[-90deg] pt-0 pb-0">
                <p className="text-7xl font-bold text-orange-500 pt-0 pb-0">EventsPRO</p>
                <p className="text-xl text-center text-white">
                    Organize, promote, and execute events within our college community.
                </p>
            </div>

            {/* Right Column with login Form */}
            <form onSubmit={handleLogin} className="col-span-3 flex justify-center items-center"> {/* Added flex classes */}
                <div className="rounded-[50px] bg-slate-400 shadow-md p-8 text-center backdrop-blur-lg bg-opacity-20 w-full max-w-md mx-auto"> {/* Adjusted max-width */}
                    <h2 className="text-4xl font-bold mb-10 text-white">Hey, Welcome back!</h2> {/* Centered h2 */}
                    <div className="text-center">
                        <div className="">
                            <label htmlFor="email" className="flex text-white font-bold mb-4">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-4" // Reduced width and margin-bottom
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="flex text-white font-bold mb-4">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Your Password"
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-6" // Reduced width and margin-bottom
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-8"> {/* Centered button div */}
                        <button
                            type="submit"
                            className="bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300" // Adjusted padding for better aesthetics
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
