import { motion } from 'motion/react';
import { AlertCircle, MapPin, WifiOff, Clock } from 'lucide-react';

interface ErrorScreenProps {
  errorType: 'expired' | 'location' | 'gps' | 'network';
  onRetry: () => void;
  onCancel: () => void;
}

const errorConfig = {
  expired: {
    icon: Clock,
    title: 'QR Code Expired',
    message: 'The QR code has expired. Please scan again.',
    color: '#E74C3C',
  },
  location: {
    icon: MapPin,
    title: 'Location Mismatch',
    message: 'You are too far from the classroom. Please move closer.',
    color: '#E74C3C',
  },
  gps: {
    icon: MapPin,
    title: 'GPS Disabled',
    message: 'Please enable Location Services in your device settings.',
    color: '#E74C3C',
  },
  network: {
    icon: WifiOff,
    title: 'Saved Offline',
    message: 'Network connection is weak. Your check-in is queued and will retry automatically.',
    color: '#E74C3C',
  },
};

export function ErrorScreen({ errorType, onRetry, onCancel }: ErrorScreenProps) {
  const config = errorConfig[errorType];
  const Icon = config.icon;

  return (
    <div className="h-full bg-white flex flex-col items-center justify-center px-8 overflow-y-auto">
      {/* Error Icon with Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="mb-8"
      >
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl"
          style={{ backgroundColor: config.color }}
        >
          <Icon size={64} className="text-white" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* Error Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          {config.title}
        </h1>
        <p className="text-gray-600 leading-relaxed">
          {config.message}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full space-y-4"
      >
        {/* Primary Button - Try Again */}
        <button
          onClick={onRetry}
          className="w-full bg-[#1F3C88] text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-[#152d66] transition-all active:scale-98"
        >
          Try Again
        </button>

        {/* Secondary Button - Cancel */}
        <button
          onClick={onCancel}
          className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all active:scale-98"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
