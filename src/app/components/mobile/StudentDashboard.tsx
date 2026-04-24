import { QrCode, Clock, CheckCircle, Calendar, LogOut, MapPin, Wifi, Bell, Camera } from 'lucide-react';

interface StudentDashboardProps {
  onScanAttendance: () => void;
  onLogout: () => void;
}

export function StudentDashboard({ onScanAttendance, onLogout }: StudentDashboardProps) {
  const todayClasses = [
    { id: '1', code: 'CSS323', name: 'Advanced Web Development', time: '09:00 AM', attended: true, window: 'Start complete' },
    { id: '2', code: 'CS201', name: 'Data Structures', time: '11:30 AM', attended: false, window: 'Open now' },
    { id: '3', code: 'CS305', name: 'Software Engineering', time: '02:00 PM', attended: false, window: 'Pending' },
  ];

  const stats = {
    totalClasses: 42,
    attended: 38,
    percentage: 90,
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1F3C88] to-[#152d66] pt-12 pb-20 px-6 rounded-b-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-white text-2xl font-semibold mb-2">Welcome Back!</h1>
            <p className="text-white/80 text-sm">Sarah Johnson · 6622780001</p>
          </div>
          <button
            onClick={onLogout}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 sm:px-6 -mt-10 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-700">
              <Bell size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">Attendance window open</h3>
              <p className="text-xs text-gray-600 mt-1">CS201 Middle check-in closes in 08:42.</p>
            </div>
          </div>
        </div>

        {/* Quick Scan Button */}
        <button
          onClick={onScanAttendance}
          className="w-full bg-white rounded-2xl p-6 shadow-lg mb-6 active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#2ECC71] rounded-2xl flex items-center justify-center">
              <QrCode size={28} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900 mb-1">Scan QR Code</h3>
              <p className="text-sm text-gray-600">Mark your attendance</p>
            </div>
            <div className="text-[#1F3C88]">→</div>
          </div>
        </button>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { label: 'GPS On', icon: MapPin, color: 'text-[#2ECC71]' },
            { label: 'Camera OK', icon: Camera, color: 'text-[#2ECC71]' },
            { label: '1 queued', icon: Wifi, color: 'text-orange-600' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
                <Icon size={18} className={`mx-auto mb-1 ${item.color}`} />
                <div className="text-[11px] font-medium text-gray-700">{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* Attendance Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">This Month</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1F3C88]">{stats.totalClasses}</div>
              <div className="text-xs text-gray-600 mt-1">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2ECC71]">{stats.attended}</div>
              <div className="text-xs text-gray-600 mt-1">Attended</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1F3C88]">{stats.percentage}%</div>
              <div className="text-xs text-gray-600 mt-1">Rate</div>
            </div>
          </div>
        </div>

        {/* Today's Classes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Today's Classes</h3>
            <Calendar size={18} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-[#1F3C88]">{cls.code}</span>
                      {cls.attended && (
                        <CheckCircle size={16} className="text-[#2ECC71]" />
                      )}
                    </div>
                    <p className="text-sm text-gray-900 mb-1">{cls.name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>{cls.time} · {cls.window}</span>
                    </div>
                  </div>
                  {cls.attended ? (
                    <div className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] rounded-full text-xs font-medium">
                      Attended
                    </div>
                  ) : (
                    <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      Pending
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {[
              'CSS323 Start synced at 09:04 AM',
              'Offline queue will retry automatically',
              'PDPA consent accepted for GPS + selfie',
            ].map((activity) => (
              <div key={activity} className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 text-xs text-gray-600">
                {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
