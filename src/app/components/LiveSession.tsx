import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Download, MapPin, Pause, Play, RefreshCw, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { downloadCsv } from '../lib/exportCsv';

interface LiveSessionProps {
  courseId: string;
  sessionType: 'Start' | 'Middle' | 'End';
  onEndSession: () => void;
}

interface Student {
  id: string;
  name: string;
  checkInTime: string;
  gps: 'Verified' | 'Review';
  selfie: 'Verified' | 'Pending';
}

export function LiveSession({ courseId, sessionType, onEndSession }: LiveSessionProps) {
  const [countdown, setCountdown] = useState(60);
  const [qrValue, setQrValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [feedback, setFeedback] = useState('Dynamic QR is live and accepting check-ins.');
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Sarah Johnson', checkInTime: '09:01 AM', gps: 'Verified', selfie: 'Verified' },
    { id: '2', name: 'Michael Chen', checkInTime: '09:01 AM', gps: 'Verified', selfie: 'Pending' },
    { id: '3', name: 'Emma Williams', checkInTime: '09:02 AM', gps: 'Review', selfie: 'Verified' },
    { id: '4', name: 'James Rodriguez', checkInTime: '09:02 AM', gps: 'Verified', selfie: 'Verified' },
    { id: '5', name: 'Olivia Brown', checkInTime: '09:03 AM', gps: 'Verified', selfie: 'Verified' },
  ]);
  const [isPulsing, setIsPulsing] = useState(false);
  const expectedStudents = courseId === 'CS150' ? 78 : courseId === 'CS201' ? 62 : 45;

  // Generate new QR code
  const generateQRCode = () => {
    const timestamp = Date.now();
    const nextSessionId = `${courseId}-${sessionType.toUpperCase()}-${timestamp.toString().slice(-5)}`;
    const sessionData = {
      courseId,
      sessionId: nextSessionId,
      timestamp,
      sessionType,
      room: 'CPE-401',
      geofenceMeters: 35,
      token: Math.random().toString(36).substring(7),
    };
    setSessionId(nextSessionId);
    setQrValue(JSON.stringify(sessionData));
    setCountdown(60);
    setIsPulsing(true);
    setFeedback('QR refreshed with a new timestamp and anti-replay token.');
    setTimeout(() => setIsPulsing(false), 500);
  };

  // Initialize QR code
  useEffect(() => {
    generateQRCode();
  }, [courseId]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused) {
        return;
      }

      setCountdown((prev) => {
        if (prev <= 1) {
          generateQRCode();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Simulate new students checking in
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && Math.random() > 0.7) {
        const newStudent = {
          id: Date.now().toString(),
          name: `Student ${students.length + 1}`,
          checkInTime: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          gps: Math.random() > 0.15 ? 'Verified' : 'Review',
          selfie: Math.random() > 0.2 ? 'Verified' : 'Pending',
        };
        setStudents((prev) => [newStudent, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [students.length]);

  const verifiedCount = students.filter((student) => student.gps === 'Verified' && student.selfie === 'Verified').length;
  const reviewCount = students.length - verifiedCount;
  const attendanceRate = Math.round((students.length / expectedStudents) * 100);
  const handleExport = () => {
    downloadCsv(`live-${courseId}-${sessionType}-attendance.csv`, students.map((student) => ({
      session_id: sessionId,
      course_id: courseId,
      session_type: sessionType,
      student_id: student.id,
      student_name: student.name,
      check_in_time: student.checkInTime,
      gps_status: student.gps,
      selfie_status: student.selfie,
    })));
    setFeedback(`CSV downloaded for ${students.length} live check-ins in ${courseId}.`);
  };

  return (
    <div className="grid grid-cols-[1fr_380px] gap-8 h-full">
      {/* Main Content */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-1">
                {courseId} - Live Session
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Session Type: {sessionType}</span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  isPaused ? 'bg-orange-100 text-orange-700' : 'bg-[#2ECC71]/10 text-[#2ECC71]'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-orange-500' : 'bg-[#2ECC71] animate-pulse'}`} />
                  <span className="text-sm font-semibold">{isPaused ? 'PAUSED' : 'LIVE'}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{feedback}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Present', value: students.length, tone: 'text-[#2ECC71]' },
            { label: 'Expected', value: expectedStudents, tone: 'text-gray-900' },
            { label: 'Rate', value: `${attendanceRate}%`, tone: 'text-[#1F3C88]' },
            { label: 'Needs Review', value: reviewCount, tone: 'text-orange-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className={`text-2xl font-bold ${stat.tone}`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* QR Code Container */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={isPulsing ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white p-12 rounded-2xl shadow-2xl border-2 border-gray-100"
          >
            <div className="bg-white p-8 rounded-xl shadow-inner">
              {qrValue && (
                <QRCodeSVG
                  value={qrValue}
                  size={320}
                  level="H"
                  includeMargin={false}
                />
              )}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-1">QR refreshes every 60 seconds</p>
              <p className="text-xs text-gray-500 mb-2">Session ID: {sessionId || 'Generating...'}</p>
              <motion.div
                key={countdown}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold text-[#1F3C88]"
              >
                {countdown}s
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onEndSession}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
          >
            End Session
          </button>
          <button
            onClick={() => {
              setIsPaused((paused) => !paused);
              setFeedback(isPaused ? 'Session resumed. Students can scan again.' : 'Session paused. QR countdown and check-ins are temporarily stopped.');
            }}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
            {isPaused ? 'Resume Session' : 'Pause Session'}
          </button>
          <button
            onClick={generateQRCode}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} />
            Refresh QR
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-3 bg-[#2ECC71] text-white rounded-lg font-medium hover:bg-[#27ae60] transition-colors shadow-sm"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Right Side Panel */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
        {/* Student Counter */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-[#1F3C88]" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Real-Time Attendance</h3>
          </div>
          <motion.div
            key={students.length}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            className="text-5xl font-bold text-[#2ECC71]"
          >
            {students.length}
          </motion.div>
          <p className="text-gray-600 mt-1">Students Present</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="rounded-lg bg-green-50 p-3">
              <div className="text-lg font-bold text-green-700">{verifiedCount}</div>
              <div className="text-xs text-green-700">Verified</div>
            </div>
            <div className="rounded-lg bg-orange-50 p-3">
              <div className="text-lg font-bold text-orange-700">{reviewCount}</div>
              <div className="text-xs text-orange-700">Review</div>
            </div>
          </div>
        </div>

        <div className="mb-5 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#1F3C88]" />
            Classroom geofence: 35m
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#1F3C88]" />
            Selfie source: live camera only
          </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Check-ins</h4>
          <div className="space-y-2">
            {students.map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="w-8 h-8 bg-[#2ECC71] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {student.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {student.checkInTime} · GPS {student.gps} · Selfie {student.selfie}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
