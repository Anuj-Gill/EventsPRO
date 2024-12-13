import React from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import HeroSection from "../components/landingPage/HeroSection";
import FeaturesSection from "../components/landingPage/FeaturesSection";
import WavySection from "../components/landingPage/WavyBackground";
import { TimelineDemo } from "../components/landingPage/Timeline";
import { AnimatedTestimonialsDemo } from "../components/landingPage/Testimonials";
import Footer from "../components/Helpers/Footer.tsx";

const LandingPage2 = () => {
  return (
    <div className="min-h-screen">
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col">
          <div>
            <div className="absolute z-0 inset-0 overflow-hidden animate-gradient-move">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/30 rounded-full filter blur-3xl animate-gradient-move" />
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full filter blur-3xl animate-gradient-move delay-2000" />
              <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/20 rounded-full filter blur-3xl animate-gradient-move delay-4000" />
            </div>
            <div className="absolute z-0 inset-0 overflow-hidden animate-gradient-move">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/30 rounded-full filter blur-3xl animate-gradient-move" />
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full filter blur-3xl animate-gradient-move delay-2000" />
              <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/20 rounded-full filter blur-3xl animate-gradient-move delay-4000" />
            </div>
            <HeroSection />
            <FeaturesSection />

          </div>
          <WavySection />
          <TimelineDemo />
          <AnimatedTestimonialsDemo />
        </div>
      </BackgroundBeamsWithCollision>
      <Footer />
    </div>
  );
};

export default LandingPage2;
