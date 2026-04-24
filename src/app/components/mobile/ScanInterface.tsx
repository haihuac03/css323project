import { useState } from 'react';
import { ArrowLeft, Flashlight, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface ScanInterfaceProps {
  onScanSuccess: () => void;
  onBack: () => void;
}

export function ScanInterface({ onScanSuccess, onBack }: ScanInterfaceProps) {
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'scanned'>('idle');

  // Simulate scan success after 3 seconds
  const handleAutoScan = () => {
    setScanStatus('scanning');
    setTimeout(() => {
      setScanStatus('scanned');
    }, 3000);
  };

  return (
    <div className="h-full bg-black relative overflow-y-auto">
      {/* Camera Preview Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-80" />
      {flashlightOn && <div className="absolute inset-0 bg-white/10" />}
      
      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between p-6 text-white">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>
        
        <h2 className="font-semibold">Scan Attendance QR</h2>
        
        <button
          onClick={() => setFlashlightOn((enabled) => !enabled)}
          className={`w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm active:scale-95 transition-transform ${
            flashlightOn ? 'bg-yellow-300 text-gray-900' : 'bg-white/10'
          }`}
          aria-label="Toggle flashlight"
        >
          <Flashlight size={20} />
        </button>
      </div>

      {/* Center Scanning Frame */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100%-180px)] px-8 py-6">
        {/* Scanning Frame */}
        <div className="relative w-64 h-64">
          {/* Animated Corners */}
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            {/* Top Left Corner */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#2ECC71] rounded-tl-3xl" />
            {/* Top Right Corner */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#2ECC71] rounded-tr-3xl" />
            {/* Bottom Left Corner */}
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#2ECC71] rounded-bl-3xl" />
            {/* Bottom Right Corner */}
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#2ECC71] rounded-br-3xl" />
          </motion.div>

          {/* Scanning Line Animation */}
          <motion.div
            animate={{
              y: [0, 240, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 right-0 h-0.5 bg-[#2ECC71] shadow-[0_0_10px_rgba(46,204,113,0.8)]"
          />

          {/* Center Transparent Area */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-3xl" />
        </div>

        {/* Instruction Text */}
        <p className="text-white text-center mt-8 text-sm">
          {scanStatus === 'scanned' ? 'QR code validated' : 'Align the QR code within the frame'}
        </p>

        {scanStatus === 'scanned' ? (
          <div className="mt-6 w-full bg-white rounded-2xl p-4 text-left shadow-xl">
            <div className="text-xs font-semibold text-[#1F3C88] mb-1">CS201 · Middle</div>
            <h3 className="font-semibold text-gray-900">Data Structures & Algorithms</h3>
            <p className="text-xs text-gray-600 mt-2">Room SC-204 · Geofence 35m · QR expires in 60s</p>
            <button
              onClick={onScanSuccess}
              className="mt-4 w-full bg-[#2ECC71] text-white py-3 rounded-xl font-semibold active:scale-98"
            >
              Continue to Selfie
            </button>
          </div>
        ) : (
          <button
            onClick={handleAutoScan}
            disabled={scanStatus === 'scanning'}
            className="mt-8 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm disabled:opacity-60"
          >
            {scanStatus === 'scanning' ? 'Scanning...' : 'Simulate Scan (Demo)'}
          </button>
        )}
      </div>

      {/* Bottom Message */}
      <div className="relative z-10 flex items-center justify-center gap-2 pb-8 text-white/70 text-sm">
        <Clock size={16} />
        <span>QR refreshes every 60 seconds</span>
      </div>
    </div>
  );
}
