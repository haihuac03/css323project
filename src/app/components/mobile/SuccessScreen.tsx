import { motion } from 'motion/react';
import { Check, MapPin, ShieldCheck, Wifi } from 'lucide-react';

interface SuccessScreenProps {
  onDone: () => void;
}

export function SuccessScreen({ onDone }: SuccessScreenProps) {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="h-full bg-white flex flex-col items-center justify-center px-8 overflow-y-auto">
      {/* Success Icon with Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="mb-8"
      >
        <div className="w-32 h-32 bg-[#2ECC71] rounded-full flex items-center justify-center shadow-2xl">
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Check size={64} className="text-white" strokeWidth={3} />
          </motion.div>
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Attendance Recorded
        </h1>
        <p className="text-gray-600">
          Time: <span className="font-semibold text-[#1F3C88]">{currentTime}</span>
        </p>
      </motion.div>

      <div className="w-full grid gap-3 mb-8">
        {[
          { label: 'CS201 Middle session', icon: ShieldCheck },
          { label: 'GPS verified within classroom', icon: MapPin },
          { label: 'Synced to attendance record', icon: Wifi },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm text-gray-700">
              <Icon size={18} className="text-[#2ECC71]" />
              {item.label}
            </div>
          );
        })}
      </div>

      {/* Done Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onDone}
        className="w-full bg-[#1F3C88] text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-[#152d66] transition-all active:scale-98"
      >
        Done
      </motion.button>
    </div>
  );
}
