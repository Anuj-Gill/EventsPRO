import React, { useState, useEffect } from 'react';
import { cn } from "../../lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  committee,
  eventPoster,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  committee?: {
    nickName?: string;
    committeeName?: string;
  };
  eventPoster?: string;
}) => {
  const [posterURL, setPosterURL] = useState<string | null>(null);
  useEffect(() => {
    function extractEmbedCode(driveLink: string) {
      try {
        const fileIdMatch = driveLink.match(/[-\w]{25,}/);
        if (fileIdMatch) {
          const fileId = fileIdMatch[0];
          const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
          setPosterURL(embedUrl);
        }
      } catch (error) {
        console.error("Error extracting Drive link:", error);
      }
    }
    if (eventPoster) {
      extractEmbedCode(eventPoster);
    }
  }, [eventPoster]);
  return (
    <div
      className={cn(
        "rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent flex flex-col justify-between space-y-4",
        className
      )}
    >
      {posterURL && (
        <div className=" h-[60%] overflow-hidden rounded-lg">
          <iframe
            src={posterURL}
            width="100%"
            height="100%"
            allow="autoplay"
            className="border-none"
          />
        </div>
      )}
      <div className="flex-grow flex flex-col justify-between group-hover/bento:translate-y-2 transition duration-200">
        {icon}
        <div>
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          {committee && (
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              {committee.nickName || committee.committeeName}
            </div>
          )}
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
