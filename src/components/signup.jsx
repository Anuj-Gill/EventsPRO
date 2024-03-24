export default function SignUp() {
    return (
      <div className="grid grid-cols-4 h-screen bg-white">
        {/* Left Column with Logo and Tagline */}
        <div className="col-span-1 flex flex-col items-center justify-center transform rotate-[-90deg] pt-0 pb-0">
          <p className="text-7xl font-bold text-blue-900 pt-0 pb-0">EventsPRO</p>
          <p className="text-xl text-center text-gray-700">
            Organize, promote, and execute events within our college community.
          </p>
        </div>
  
         {/* Right Column with Signup Form */}
      <div className="col-span-3 rounded-md shadow-md p-8 bg-slate-200 text-center">
        <h2 className="text-4xl font-bold mb-10">Create Account</h2>
        <div className="text-center">
        <div className="mb-2">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-3">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            className="w-4/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
          />
        </div>
        <div className="">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-3">
            College Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            className="w-4/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-3">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your Password"
            className="w-4/6 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-10"
          />
        </div>
        </div>
        <div className="text-center"> 
        <button
          type="submit"
          className="w-2/5 bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors duration-300 mb-3"
        >
          Create Account
        </button>
        </div>
        <p className="mt-4 text-center">
          Already have an account? <a href="#" className="text-blue-900 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}