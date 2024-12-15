import React from "react";
import { WavyBackground } from "../ui/wavy-background";

const WavySection = () => {
  return (
    <div className="pt-20">
      <WavyBackground className="max-w-6xl mx-auto py-28 md:py-56">
        <p className="text-2xl md:text-4xl lg:text-6xl text-white font-bold text-center">
          Managing Events Just Got Easier
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal text-center">
          Simplify your workflow with EventsPro. From creation to analytics, everything in one place.
        </p>
      </WavyBackground>
    </div>
  );
};

export default WavySection;
