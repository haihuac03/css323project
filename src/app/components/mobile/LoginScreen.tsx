import { Lock, Shield } from 'lucide-react';
import { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <div className="h-full bg-gradient-to-br from-white to-gray-50 flex flex-col overflow-y-auto">
      {/* Top Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-[#1F3C88] to-[#152d66] rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <Shield className="text-white" size={40} />
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Smart Attendance
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Secure attendance verification
        </p>

        {/* Login Button */}
        <button
          onClick={onLogin}
          className="w-full bg-[#1F3C88] text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-[#152d66] transition-all active:scale-98"
        >
          Login with University SSO
        </button>

        {/* Security Badge */}
        <div className="flex items-center gap-2 mt-6 text-gray-500 text-sm">
          <Lock size={16} />
          <span>Secure login powered by University Authentication</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-8 text-center">
        <p className="text-xs text-gray-400 mb-2">Version 1.0.0</p>
        <button
          onClick={() => setPrivacyOpen((open) => !open)}
          className="text-xs text-gray-400 underline"
        >
          Privacy Policy
        </button>
        {privacyOpen && (
          <p className="mt-3 text-xs text-gray-500 leading-relaxed">
            PDPA mock notice: GPS and live selfie are used only for attendance verification.
          </p>
        )}
      </div>
    </div>
  );
}
