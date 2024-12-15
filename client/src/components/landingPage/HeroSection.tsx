import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const rocketRef = useRef<HTMLDivElement>(null);
  const [rocketTransform, setRocketTransform] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Adjust horizontal and vertical positions based on scroll
      setRocketTransform({
        x: scrollY / 1, // Adjust divisor for horizontal speed
        y: -scrollY / 1, // Adjust divisor for vertical speed (negative for upward movement)
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="max-w-6xl z-10 mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0">
      {/* Hero Text */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-white">
          Manage College Events Like Never Before
        </h1>
        <p className="mt-6 text-gray-300 text-xl">
          One platform for all your college committee needs - from event
          creation to registration, publicity, and analytics.
        </p>
        <div className="mt-8 z-100 flex space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-purple-600/80 backdrop-blur-sm rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105 text-lg shadow-lg"
          >
            Get Started
          </button>
          <a href="https://www.youtube.com/watch?v=TXiTdC3YRHQ">
            <button className="px-8 py-3 border border-purple-500/50 backdrop-blur-sm rounded-lg hover:bg-purple-900/30 transition-transform transform hover:scale-105 text-lg shadow-lg">

              Watch Demo
            </button>

          </a>

        </div>
      </div>

      {/* Hero Rocket */}
      <div
        className="w-full lg:w-1/2 flex justify-center"
        ref={rocketRef}
        style={{
          transform: `translate(${rocketTransform.x}px, ${rocketTransform.y}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        <div className="relative w-48 h-48 lg:w-72 lg:h-72 mt-20 md:mt-0 animate-rock">
          <img
            src="/assets/rocket.png" // Replace with your actual image path
            alt="Rocket"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
