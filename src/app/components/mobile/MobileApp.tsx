import { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { StudentDashboard } from './StudentDashboard';
import { ScanInterface } from './ScanInterface';
import { SelfieCapture } from './SelfieCapture';
import { SuccessScreen } from './SuccessScreen';
import { ErrorScreen } from './ErrorScreen';
import { LoadingSpinner } from './LoadingSpinner';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

type Screen = 'login' | 'dashboard' | 'scan' | 'selfie' | 'success' | 'error' | 'loading';
type ErrorType = 'expired' | 'location' | 'gps' | 'network';

export function MobileApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [errorType, setErrorType] = useState<ErrorType>('expired');
  const [loadingMessage, setLoadingMessage] = useState('Processing...');
  const [showDebug, setShowDebug] = useState(false);

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleScanAttendance = () => {
    setCurrentScreen('scan');
  };

  const handleScanSuccess = () => {
    setCurrentScreen('selfie');
  };

  const handleSelfieCapture = () => {
    // Show loading
    setLoadingMessage('Verifying selfie, GPS and session token...');
    setCurrentScreen('loading');
    
    // Simulate processing
    setTimeout(() => {
      setCurrentScreen('success');
    }, 2000);
  };

  const handleDone = () => {
    setCurrentScreen('dashboard');
  };

  const handleRetry = () => {
    setCurrentScreen('scan');
  };

  const handleCancel = () => {
    setCurrentScreen('dashboard');
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Mobile Frame */}
      <div className="min-h-screen flex items-center justify-center p-3 md:p-4">
        <div className="relative flex flex-col xl:flex-row items-center xl:items-start gap-4">
          {/* Phone Frame */}
          <div className="w-[min(390px,calc(100vw-24px))] h-[min(844px,calc(100vh-96px))] min-h-[620px] bg-black rounded-[2.5rem] md:rounded-[3rem] p-2.5 md:p-3 shadow-2xl">
            {/* Screen */}
            <div className="w-full h-full bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
                  {currentScreen === 'dashboard' && (
                    <StudentDashboard onScanAttendance={handleScanAttendance} onLogout={handleLogout} />
                  )}
                  {currentScreen === 'scan' && (
                    <ScanInterface onScanSuccess={handleScanSuccess} onBack={handleBack} />
                  )}
                  {currentScreen === 'selfie' && (
                    <SelfieCapture onCapture={handleSelfieCapture} />
                  )}
                  {currentScreen === 'loading' && <LoadingSpinner message={loadingMessage} />}
                  {currentScreen === 'success' && <SuccessScreen onDone={handleDone} />}
                  {currentScreen === 'error' && (
                    <ErrorScreen
                      errorType={errorType}
                      onRetry={handleRetry}
                      onCancel={handleCancel}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Device Notch */}
          <div className="absolute top-2.5 md:top-3 left-1/2 xl:left-[195px] transform -translate-x-1/2 w-32 md:w-40 h-6 md:h-7 bg-black rounded-b-3xl z-20" />

          {/* Quick Navigation Panel (Demo Controls) */}
          <div className="w-[min(390px,calc(100vw-24px))] xl:w-56 xl:absolute xl:left-[calc(100%+1rem)] xl:top-0">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="mb-2 w-full bg-white px-4 py-2 rounded-lg shadow-md flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Screen Navigation
              <ChevronDown size={16} className={`transition-transform ${showDebug ? 'rotate-180' : ''}`} />
            </button>
            
            {showDebug && (
              <div className="bg-white rounded-lg shadow-md p-4 w-full">
                <p className="text-xs font-semibold text-gray-500 mb-3">Quick Jump:</p>
                <div className="space-y-2">
                  <button
                    onClick={() => setCurrentScreen('login')}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      currentScreen === 'login' ? 'bg-[#1F3C88] text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    1. Login
                  </button>
                  <button
                    onClick={() => setCurrentScreen('dashboard')}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      currentScreen === 'dashboard' ? 'bg-[#1F3C88] text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    2. Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentScreen('scan')}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      currentScreen === 'scan' ? 'bg-[#1F3C88] text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    3. QR Scanner
                  </button>
                  <button
                    onClick={() => setCurrentScreen('selfie')}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      currentScreen === 'selfie' ? 'bg-[#1F3C88] text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    4. Selfie Capture
                  </button>
                  <button
                    onClick={() => setCurrentScreen('success')}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      currentScreen === 'success' ? 'bg-[#1F3C88] text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    5. Success
                  </button>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Error States:</p>
                    {['expired', 'location', 'gps', 'network'].map((err) => (
                      <button
                        key={err}
                        onClick={() => {
                          setErrorType(err as ErrorType);
                          setCurrentScreen('error');
                        }}
                        className="w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-100 capitalize"
                      >
                        {err}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
