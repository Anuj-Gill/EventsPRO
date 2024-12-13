import React, { useEffect, useRef } from "react";
import { Calendar, Users, Megaphone, BarChart3 } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const features = featuresRef.current?.querySelectorAll(".feature-card");
    features?.forEach((feature) => {
      feature.classList.add("opacity-0", "translate-y-10");
      observer.observe(feature);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20" ref={featuresRef}>
      <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
        Everything You Need
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureCard
          icon={<Calendar className="w-12 h-12 text-purple-500" />}
          title="Event Management"
          description="Create and manage events with ease. Handle registrations, tickets, and schedules all in one place."
        />
        <FeatureCard
          icon={<Users className="w-12 h-12 text-blue-500" />}
          title="Student Registration"
          description="Streamlined registration process with automated confirmations and participant tracking."
        />
        <FeatureCard
          icon={<Megaphone className="w-12 h-12 text-pink-500" />}
          title="Publicity Tools"
          description="Built-in tools for social media promotion, email campaigns, and event marketing."
        />
        <FeatureCard
          icon={<BarChart3 className="w-12 h-12 text-green-500" />}
          title="Analytics & Reports"
          description="Comprehensive reports and analytics to track event success and attendance metrics."
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
