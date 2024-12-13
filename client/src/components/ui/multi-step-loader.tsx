
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-8 h-8 ", className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-8 h-8 ", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type LoadingState = {
  text: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  return (
    <div className="flex relative text-3xl font-semibold justify-start max-w-xl mx-auto flex-col mt-40">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={index}
            className={cn("text-left flex gap-2 mb-4 items-center")}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {index > value && (
                <CheckIcon className="text-gray-500 dark:text-gray-400" />
              )}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    "text-gray-500 dark:text-gray-400",
                    value === index &&
                    "text-purple-500 dark:text-purple-500 opacity-100"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-gray-700 dark:text-gray-300 ",
                value === index && "text-purple-500 dark:text-purple-500 opacity-100"
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  onComplete,
  onError, // New optional prop
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  onComplete?: () => void;
  onError?: () => void; // Optional error handler
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }

    const timeout = setTimeout(() => {
      const nextState = currentState + 1;

      if (nextState === loadingStates.length) {
        // Reached final state
        return;
      }

      // If you want to simulate an error midway (optional)
      // You can add a condition here to trigger onError
      // For example:
      // if (someErrorCondition) {
      //   onError?.();
      //   return;
      // }

      setCurrentState(nextState);
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, duration, loadingStates.length, onError]);

  // Call onComplete only when loader is at final state
  useEffect(() => {
    if (loading && currentState === loadingStates.length - 1) {
      const completeTimeout = window.setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 2000);

      return () => window.clearTimeout(completeTimeout);
    }
  }, [currentState, loading, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl bg-gray-950/70"
        >
          <div className="h-96 relative">
            <LoaderCore value={currentState} loadingStates={loadingStates} />
          </div>

          <div className="bg-gradient-to-t from-gray-950 to-transparent inset-x-0 z-20 bottom-0 h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );  // Rest of the component remains the same
};
