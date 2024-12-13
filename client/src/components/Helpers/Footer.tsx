import React from 'react';
import { FloatingDock } from "..//ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin
} from "@tabler/icons-react";

const Footer = () => {
  const socialLinks = [
    {
      title: "Instagram",
      icon: (
        <div className="w-full h-full bg-gradient-to-b from-[#FEDB37] via-[#FCA838] to-[#FF7950] rounded-lg flex items-center justify-center">
          <IconBrandInstagram className="h-3/4 w-3/4 text-white" />
        </div>
      ),
      href: "https://www.instagram.com/anujgill_50/", // Replace with actual link
    },
    {
      title: "X (Twitter)",
      icon: (
        <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
          <IconBrandX className="h-3/4 w-3/4 text-white" />
        </div>
      ),
      href: "https://x.com/anujgill_01", // Replace with actual link
    },
    {
      title: "LinkedIn",
      icon: (
        <div className="w-full h-full bg-[#0077B5] rounded-lg flex items-center justify-center">
          <IconBrandLinkedin className="h-3/4 w-3/4 text-white" />
        </div>
      ),
      href: "https://www.linkedin.com/in/anuj-gill-web-dev/", // Replace with actual link
    },
    {
      title: "GitHub",
      icon: (
        <div className="w-full h-full bg-[#24292F] rounded-lg flex items-center justify-center">
          <IconBrandGithub className="h-3/4 w-3/4 text-white" />
        </div>
      ),
      href: "https://github.com/Anuj-Gill", // Replace with actual link
    }
  ];

  return (
    <footer className="bg-gray-950 text-white py-4 px-4 border-t border-gray-800 relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Reach Us Out */}
        <div className="text-md text-gray-400">
          Reach us at: eventspro03@gmail.com
        </div>

        {/* Floating Dock in Middle */}
        <div className='flex flex-col'>
          <p className='text-lg mb-2 text-center text-white'>follow us</p>
          <FloatingDock
            items={socialLinks}
            className="z-50"
          />
        </div>

        {/* All Rights Reserved */}
        <div className="text-md text-gray-400">
          © {new Date().getFullYear()} EventsPRO. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
