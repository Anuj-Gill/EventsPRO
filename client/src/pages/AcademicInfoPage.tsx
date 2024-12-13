import React from "react";
import AcademicForm from "../components/AcademicForm";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

const AcademicInfoPage: React.FC = () => {
  const animatedText =
    "Just one more step before we get started! Please provide a few academic details to personalize your experience.";

  return (
    <div className="">


      {/* Main Content */}
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-16 space-y-10 md:space-y-0">
        {/* Left Section */}
        <div className="w-full md:w-1/2 md:space-y-6 p-x-10 md:mr-16">
          <div className="text-white font-md">
            <TextGenerateEffect words={animatedText} />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2">

          <h1 className="md:text-5xl text-2xl text-center mt-10 md:mt-0 mb-10 font-bold">Academic Information</h1>
          <AcademicForm />
        </div>
      </div>
    </div>
  );
};

export default AcademicInfoPage;
