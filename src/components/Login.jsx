import bgImage from '../assets/bg.png';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
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
            })
            const res = await req.json();
            console.log(res)
            if (res.status) {
                setResponse(res.message);
                localStorage.setItem("token", `Bearer ${res.token}`);
                if(res.role == "head"){
                    navigate('/headhome',{ state: { data: res } });
                } 
                else if(res.role == "Student") {
                    navigate('/committees',{ state: { data: res } });
                }
                else {
                    navigate('/adminhome',{ state: { data: res } });
                }
            } else {
                setResponse(res.message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=" flex flex-col items-center justify-around h-screen" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            {/* Left Column with Logo and Tagline */}
            <div className="flex flex-col items-center justify-center transform -mb-20">
                <p className="text-7xl font-bold text-orange-500 pt-0 pb-0">EventsPRO</p>
                <p className="text-xl text-center text-white">
                    Organize, promote, and execute events within our college community.
                </p>
            </div>

            {/* Right Column with login Form */}
            <form onSubmit={handleLogin}>
                <div className=" bg-slate-400 rounded-3xl shadow-md p-8 text-center backdrop-blur-lg bg-opacity-20 " style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
                    <h2 className="text-4xl font-bold mb-10 text-white">Hey, Welcome back!</h2>
                    <div className="text-center">
                        <div className="flex flex-col items-start">
                            <label htmlFor="email" className="text-white font-bold mb-4">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                className="flex w-4/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-6" // Reduced margin-bottom
                            />
                        </div>
                        <div className="flex flex-col items-start mb-8">
                            <label htmlFor="password" className="text-white font-bold mb-4">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Your Password"
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="flex w-4/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-8" // Increased margin-bottom
                            />
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <button
                            type="submit"
                            className="flex w-4/6 bg-red-600 text-white py-2 rounded-md transition-colors duration-300 justify-around"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
