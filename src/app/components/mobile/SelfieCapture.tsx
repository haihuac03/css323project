import { motion } from 'motion/react';
import { Camera, CheckCircle, MapPin, ShieldCheck, User } from 'lucide-react';

interface SelfieCaptureProps {
  onCapture: () => void;
}

export function SelfieCapture({ onCapture }: SelfieCaptureProps) {
  return (
    <div className="h-full bg-gray-900 relative overflow-hidden">
      {/* Camera Preview Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
        {/* Simulated face detection area */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <User size={200} className="text-white" />
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top Section */}
        <div className="pt-12 pb-8 px-8 text-center text-white">
          <h2 className="text-xl font-semibold mb-3">Identity Verification</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Please take a live selfie to confirm your presence
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Live only', icon: Camera },
              { label: 'GPS OK', icon: MapPin },
              { label: 'Face found', icon: ShieldCheck },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-xl bg-white/10 px-2 py-2 text-[11px] text-white/90">
                  <Icon size={15} className="mx-auto mb-1" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center - Face Guide */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            {/* Circular Face Guide */}
            <div className="w-64 h-64 rounded-full border-4 border-white/40 relative overflow-hidden">
              {/* Inner guide */}
              <div className="absolute inset-4 rounded-full border-2 border-white/20" />

              {/* Center crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-16 bg-white/30 rounded-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-1 bg-white/30 rounded-full" />
              </div>
            </div>

            {/* Hint */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-64">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs text-center">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle size={13} />
                  Ensure your face is clearly visible
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom - Capture Button */}
        <div className="pb-6 px-8">
          <div className="flex flex-col items-center">
            <motion.button
              onClick={onCapture}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-white relative shadow-2xl active:shadow-xl transition-shadow"
            >
              <div className="absolute inset-0 rounded-full border-4 border-[#1F3C88]" />
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <Camera size={28} className="text-[#1F3C88]" />
              </div>
            </motion.button>
            <p className="text-white text-sm mt-4 font-medium">Capture</p>
          </div>
        </div>
      </div>
    </div>
  );
}
