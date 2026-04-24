import { useState } from 'react';
import { Calendar, Clock, Users, TrendingUp, CheckCircle, PlayCircle, Download, X } from 'lucide-react';
import { downloadCsv } from '../lib/exportCsv';

interface SessionsViewProps {
  onStartSession: (courseId: string, sessionType: 'Start' | 'Middle' | 'End') => void;
}

interface ScheduledSession {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  time: string;
  type: 'Start' | 'Middle' | 'End';
  expectedStudents: number;
  status: string;
  totalAttendees: number;
  gpsVerified: number;
  selfieVerified: number;
}

export function SessionsView({ onStartSession }: SessionsViewProps) {
  const [feedback, setFeedback] = useState('Upcoming sessions are ready to start from this schedule.');
  const [selectedResult, setSelectedResult] = useState<ScheduledSession | null>(null);
  const upcomingSessions: ScheduledSession[] = [
    {
      id: '1',
      courseId: 'CSS323',
      courseName: 'Advanced Web Development',
      date: '2026-02-16',
      time: '09:00 AM',
      type: 'Start' as const,
      expectedStudents: 45,
      status: 'scheduled',
      totalAttendees: 0,
      gpsVerified: 0,
      selfieVerified: 0,
    },
    {
      id: '2',
      courseId: 'CS201',
      courseName: 'Data Structures & Algorithms',
      date: '2026-02-16',
      time: '11:30 AM',
      type: 'Middle' as const,
      expectedStudents: 62,
      status: 'live',
      totalAttendees: 27,
      gpsVerified: 26,
      selfieVerified: 24,
    },
    {
      id: '3',
      courseId: 'CS305',
      courseName: 'Software Engineering',
      date: '2026-02-17',
      time: '14:00 PM',
      type: 'Start' as const,
      expectedStudents: 38,
      status: 'scheduled',
      totalAttendees: 0,
      gpsVerified: 0,
      selfieVerified: 0,
    },
    {
      id: '4',
      courseId: 'CSS323',
      courseName: 'Advanced Web Development',
      date: '2026-02-17',
      time: '10:30 AM',
      type: 'End' as const,
      expectedStudents: 45,
      status: 'completed',
      totalAttendees: 41,
      gpsVerified: 39,
      selfieVerified: 38,
    },
  ];

  const sessionStats = [
    {
      label: 'Sessions This Week',
      value: '12',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Hours',
      value: '18',
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      label: 'Avg. Attendance',
      value: '87%',
      icon: TrendingUp,
      color: 'bg-[#2ECC71]',
    },
    {
      label: 'Total Students',
      value: '264',
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  const exportSessionResult = (session: ScheduledSession) => {
    downloadCsv(`session-result-${session.courseId}-${session.type}.csv`, [
      {
        course_id: session.courseId,
        course_name: session.courseName,
        date: session.date,
        time: session.time,
        session_type: session.type,
        status: session.status,
        attendees: session.totalAttendees,
        expected_students: session.expectedStudents,
        attendance_rate: `${Math.round((session.totalAttendees / session.expectedStudents) * 100)}%`,
        gps_verified: session.gpsVerified,
        selfie_verified: session.selfieVerified,
      },
    ]);
    setFeedback(`${session.courseId} ${session.type} result exported as CSV.`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Sessions Management</h1>
        <p className="text-gray-600 mt-1">{feedback}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {sessionStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Sessions</h2>
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#1F3C88] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1F3C88] rounded-lg flex items-center justify-center">
                  <Calendar className="text-white" size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#1F3C88]">
                      {session.courseId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        session.type === 'Start'
                          ? 'bg-green-100 text-green-700'
                          : session.type === 'Middle'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {session.type}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        session.status === 'live'
                          ? 'bg-green-100 text-green-700'
                          : session.status === 'completed'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{session.courseName}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(session.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {session.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {session.expectedStudents} students
                    </span>
                  </div>
                </div>
              </div>
              {session.status === 'completed' ? (
                <button
                  onClick={() => {
                    setSelectedResult(session);
                    setFeedback(`${session.courseId} ${session.type} result opened.`);
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <CheckCircle size={17} />
                  View Result
                </button>
              ) : (
                <button
                  onClick={() => onStartSession(session.courseId, session.type)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1F3C88] text-white rounded-lg font-medium hover:bg-[#152d66] transition-colors"
                >
                  <PlayCircle size={17} />
                  {session.status === 'live' ? 'Open Live' : 'Start Session'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedResult && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-6">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Result · {selectedResult.courseId} {selectedResult.type}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedResult.courseName} · {new Date(selectedResult.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })} at {selectedResult.time}
                </p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                aria-label="Close session result"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-2xl font-bold text-[#1F3C88]">{selectedResult.totalAttendees}</div>
                <div className="text-sm text-gray-600">Students present</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-2xl font-bold text-[#2ECC71]">
                  {Math.round((selectedResult.totalAttendees / selectedResult.expectedStudents) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Attendance rate</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-2xl font-bold text-gray-900">{selectedResult.gpsVerified}</div>
                <div className="text-sm text-gray-600">GPS verified</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-2xl font-bold text-gray-900">{selectedResult.selfieVerified}</div>
                <div className="text-sm text-gray-600">Selfies verified</div>
              </div>
            </div>

            <div className="px-6 pb-6 text-sm text-gray-600">
              This button shows the completed attendance summary for a past session. It is useful after a
              Start/Middle/End window has already closed.
            </div>

            <div className="p-6 pt-0 flex justify-end gap-3">
              <button
                onClick={() => exportSessionResult(selectedResult)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1F3C88] text-white rounded-lg font-medium hover:bg-[#152d66] transition-colors"
              >
                <Download size={16} />
                Export Result CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
