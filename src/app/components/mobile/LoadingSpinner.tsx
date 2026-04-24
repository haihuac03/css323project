import { motion } from 'motion/react';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Processing...' }: LoadingSpinnerProps) {
  return (
    <div className="h-full bg-white flex flex-col items-center justify-center px-8">
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-16 h-16 border-4 border-gray-200 border-t-[#1F3C88] rounded-full mb-6"
      />

      {/* Loading Message */}
      <p className="text-gray-600 text-center">{message}</p>
    </div>
  );
}
