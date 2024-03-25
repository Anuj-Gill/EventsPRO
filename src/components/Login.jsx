import bgImage from '../assets/bg.png';

export default function Login() {
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
            <div className="rounded-tl-[50px] bg-slate-400 rounded-bl-[50px] col-span-3 w-rounded-md shadow-md p-8 text-center backdrop-blur-2xl bg-opacity-20" style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', borderRadius: '20px' }}>
                <h2 className="flex text-4xl font-bold mb-10 text-white">Hey, Welcome back!</h2>
                <div className="text-center">
                    <div className="">
                        <label htmlFor="email" className="flex text-white font-bold mb-4">
                            College Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            className="flex w-4/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-6" // Reduced margin-bottom
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="password" className="flex text-white font-bold mb-4">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Your Password"
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
        </div>
    );
}
