import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { extractEmbedCode } from "../../utils/ExtractEmbedCode";

type Item = {
  id: number,
  title: string;
  description: string;
  link: string;
  committeeName?: string; // Optional committee name
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [posterUrls, setPosterUrls] = useState<(string | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPosterUrls = () => {
      const urls = items.map((item) => extractEmbedCode(item.link));
      setPosterUrls(urls);
    };

    fetchPosterUrls();
  }, [items]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleCardClick = (title: string) => {
    // Navigate to the event details page with eventName as a query parameter
    navigate(`/event/info?eventName=${encodeURIComponent(title)}`);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-6 md:pr-10 py-10 md:w-screen",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.link}
          className="relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleCardClick(item.title)}
          rel="noopener noreferrer"
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gray-600 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.3,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {posterUrls[idx] && (
              <div className="h-[300px] w-full   overflow-hidden rounded-lg ">
                <div className="pointer-events-auto h-full">
                  <iframe
                    src={posterUrls[idx] || undefined}
                    className="h-full w-full object-cover border-none pointer-events-none touch-none"
                    allow="autoplay"
                  />
                </div>
              </div>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription> {truncateText(item.description, 60)}</CardDescription>
            {item.committeeName && ( // Only render if committeeName exists
              <CardDescription className="mt-2 italic text-white">
                Organized by: {item.committeeName}
              </CardDescription>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 text-lg font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-md",
        className
      )}
    >
      {children}
    </p>
  );
};
