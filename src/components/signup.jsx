import bgImage from '../assets/bg.png';
import { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const [signupData, setSignupData] = useState({
        name: "",
        rollNo: "",
        branch: "",
        year: "FE",
        gender: "Male",
        email: "",
        password: "",
        mobile: ''
    })
    const [response, setResponse] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("inside handlesignup")
        try {
            const req = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData)
            });
            const res = await req.json();
            console.log(res);
            setResponse(res.message);
            if (res.success) {
                setSignupSuccess(true);
            }
            
        }
        catch (error) {
            console.log(error)
        }
    }
    console.log(signupData);

   


    return (
        <div>

            <div className="grid grid-cols-4 h-screen" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                {/* Left Column with Logo and Tagline */}
                <div className="col-span-1 flex flex-col items-center justify-center transform rotate-[-90deg] pt-0 pb-0">
                    <p className="text-7xl font-bold text-orange-500 pt-0 pb-0">EventsPRO</p>
                    <p className="text-xl text-center text-white">
                        Organize, promote, and execute events within our college community.
                    </p>
                </div>
    
                {/* Right Column with Signup Form */}
    
                <form className="w-full" onSubmit={handleSignup}>
                    <div className="rounded-tl-[50px] bg-slate-400 rounded-bl-[50px] col-span-3  shadow-md p-8 text-center backdrop-blur-lg bg-opacity-20" style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}>
                        <h2 className="flex text-4xl font-bold mb-10 text-white">Create Account</h2>
                        <div className="text-center">
                            <div className="mb-2">
                                <label htmlFor="name" className="flex text-white font-bold mb-3">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                    className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
                                    required={true}
                                />
                            </div>
                            <div className="mb-2"></div>
                            <label htmlFor="name" className="flex text-white font-bold mb-3">
                                Roll Number
                            </label>
                            <input
                                type="text"
                                id="rollno"
                                placeholder="Roll Number"
                                onChange={(e) => setSignupData({ ...signupData, rollNo: e.target.value })}
                                className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
                                required={true}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="flex text-white font-bold mb-3">
                                Branch
                            </label>
                            <select
                                id="branch"
                                className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
                                onChange={(e) => setSignupData({ ...signupData, branch: e.target.value })}
                                required={true}
                            >
                                <option value="CMPN">CMPN</option>
                                <option value="INFT">INFT</option>
                                <option value="EXTC">EXTC</option>
                                <option value="EXCS">EXCS</option>
                                <option value="BIOMED">BIOMED</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="flex text-white font-bold mb-3">
                                Year
                            </label>
                            <select
                                id="year"
                                className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
                                onChange={(e) => setSignupData({ ...signupData, year: e.target.value })}
                                required={true}
                            >
                                <option value="FE">FE</option>
                                <option value="SE">SE</option>
                                <option value="TE">TE</option>
                                <option value="BE">BE</option>
                            </select>
    
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="flex text-white font-bold mb-3">
                                Gender
                            </label>
                            <select
                                id="gender"
                                className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
                                onChange={(e) => setSignupData({ ...signupData, gender: e.target.value })}
                                required={true}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="flex text-white font-bold mb-3">
                                College Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
                                required={true}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="flex text-white font-bold mb-3">
                                Mobile Number
                            </label>
                            <input
                                type="mobile"
                                id="mobile"
                                placeholder="Mobile Number"
                                onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value })}
                                className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
                                required={true}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="flex text-white font-bold mb-3">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Your Password"
                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                className="flex w-5/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="flex w-5/6 bg-red-600 text-white py-2 rounded-md transition-colors duration-300 mb-3 justify-around"
                        >
                            Create Account
                        </button>
                    </div>
                    <p className="flex mt-4 text-center text-white">
                        Already have an account?<a href="#" className="text-white ml-2 hover:underline" onClick={() => navigate('/login')}>Login</a>
                    </p>
    
    
                </form >
            </div >
                <div className='text-black'>{response}</div>
                {
                    signupSuccess && (
                        <button onClick={() => navigate('/login')}>Login</button>
                    )
                }
        </div>
    );
}
