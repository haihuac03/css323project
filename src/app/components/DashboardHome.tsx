import { useState } from 'react';
import { Activity, CheckCircle, Clock, ShieldCheck, Users } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  totalStudents: number;
  room: string;
  attendanceRate: number;
}

interface DashboardHomeProps {
  onCreateSession: (courseId: string, sessionType: 'Start' | 'Middle' | 'End') => void;
  onViewHistory: (courseId?: string) => void;
}

export function DashboardHome({ onCreateSession, onViewHistory }: DashboardHomeProps) {
  const [sessionTypes, setSessionTypes] = useState<Record<string, 'Start' | 'Middle' | 'End'>>({});
  const [feedback, setFeedback] = useState('Ready to generate a dynamic QR attendance session.');

  const courses: Course[] = [
    { id: 'CSS323', name: 'Advanced Web Development', totalStudents: 45, room: 'CPE-401', attendanceRate: 91 },
    { id: 'CS201', name: 'Data Structures & Algorithms', totalStudents: 62, room: 'SC-204', attendanceRate: 88 },
    { id: 'CS305', name: 'Software Engineering', totalStudents: 38, room: 'CPE-302', attendanceRate: 94 },
    { id: 'CS401', name: 'Machine Learning', totalStudents: 54, room: 'AI Lab', attendanceRate: 85 },
    { id: 'CS150', name: 'Introduction to Programming', totalStudents: 78, room: 'Hall A', attendanceRate: 82 },
    { id: 'CS340', name: 'Database Systems', totalStudents: 41, room: 'CPE-210', attendanceRate: 90 },
  ];

  const recentCheckIns = [
    { name: 'Sarah Johnson', course: 'CSS323', status: 'Selfie + GPS verified', time: '09:03 AM' },
    { name: 'Michael Chen', course: 'CSS323', status: 'Selfie pending review', time: '09:04 AM' },
    { name: 'Emma Williams', course: 'CS201', status: 'Queued offline sync', time: '11:32 AM' },
  ];

  const handleSessionTypeChange = (courseId: string, value: 'Start' | 'Middle' | 'End') => {
    setSessionTypes((prev) => ({ ...prev, [courseId]: value }));
    setFeedback(`${courseId} will open a ${value.toLowerCase()} attendance window.`);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Professor Dashboard</h1>
          <p className="text-gray-600 mt-1">{feedback}</p>
        </div>
        <button
          onClick={() => onViewHistory()}
          className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          View All History
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Active Courses', value: courses.length, icon: Activity, color: 'bg-[#1F3C88]' },
          { label: 'Students Covered', value: '318', icon: Users, color: 'bg-[#2ECC71]' },
          { label: 'Avg. Attendance', value: '88%', icon: CheckCircle, color: 'bg-indigo-500' },
          { label: 'QR Expiry', value: '60s', icon: Clock, color: 'bg-orange-500' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className={`w-11 h-11 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={22} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-[1fr_320px] gap-6">
        <div className="grid grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#1F3C88]/20 transition-all duration-200"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-block px-3 py-1 bg-[#1F3C88]/10 rounded-lg">
                  <span className="text-[#1F3C88] text-sm font-semibold">{course.id}</span>
                </div>
                <span className="text-xs font-medium text-gray-500">{course.room}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 min-h-[3.5rem]">
                {course.name}
              </h3>
              
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-2 text-sm">
                  <Users size={18} />
                  {course.totalStudents} Students
                </span>
                <span className="text-sm font-semibold text-[#2ECC71]">{course.attendanceRate}%</span>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in window</label>
                <select
                  value={sessionTypes[course.id] ?? 'Start'}
                  onChange={(event) =>
                    handleSessionTypeChange(course.id, event.target.value as 'Start' | 'Middle' | 'End')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
                >
                  <option value="Start">Start</option>
                  <option value="Middle">Middle</option>
                  <option value="End">End</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => onCreateSession(course.id, sessionTypes[course.id] ?? 'Start')}
                className="flex-1 bg-[#1F3C88] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#152d66] transition-all shadow-sm hover:shadow-md"
              >
                Create Session
              </button>
              <button
                onClick={() => onViewHistory(course.id)}
                className="flex-1 border-2 border-[#1F3C88] text-[#1F3C88] px-4 py-2.5 rounded-lg font-medium hover:bg-[#1F3C88] hover:text-white transition-all"
              >
                View History
              </button>
            </div>
          </div>
        ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-fit">
          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck className="text-[#1F3C88]" size={22} />
            <h2 className="text-lg font-semibold text-gray-900">Recent Verification</h2>
          </div>
          <div className="space-y-3">
            {recentCheckIns.map((item) => (
              <div key={`${item.name}-${item.time}`} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
                <div className="text-xs font-semibold text-[#1F3C88] mb-1">{item.course}</div>
                <div className="text-xs text-gray-600">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
