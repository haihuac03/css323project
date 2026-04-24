import { useState } from 'react';
import { Link, ShieldCheck, UserPlus } from 'lucide-react';

export function SettingsView() {
  const [qrInterval, setQrInterval] = useState('60');
  const [autoEnd, setAutoEnd] = useState('60');
  const [geofence, setGeofence] = useState('35');
  const [settings, setSettings] = useState({
    checkInEmail: true,
    summary: true,
    weekly: false,
    pdpa: true,
    offlineQueue: true,
    lmsLinked: false,
    ssoActive: true,
  });
  const [feedback, setFeedback] = useState('Settings are ready. Changes are simulated locally for the mockup.');

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">{feedback}</p>
      </div>
      
      <div className="grid gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Dr. Kevin Glaentzlin"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faculty
              </label>
              <input
                type="text"
                defaultValue="Faculty of Computer Science"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="k.glaentzlin@university.edu"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
              />
            </div>
          </div>
        </div>

        {/* Session Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Refresh Interval (seconds)
              </label>
              <select
                value={qrInterval}
                onChange={(event) => {
                  setQrInterval(event.target.value);
                  setFeedback(`QR refresh interval changed to ${event.target.value} seconds.`);
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
              >
                <option value="30">30 seconds</option>
                <option value="60">60 seconds</option>
                <option value="90">90 seconds</option>
                <option value="120">120 seconds</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-end Session After
              </label>
              <select
                value={autoEnd}
                onChange={(event) => {
                  setAutoEnd(event.target.value);
                  setFeedback(`Auto-end timer changed to ${event.target.value} minutes.`);
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
              >
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Geofence Radius (meters)
              </label>
              <input
                type="number"
                value={geofence}
                onChange={(event) => {
                  setGeofence(event.target.value);
                  setFeedback(`Classroom geofence radius set to ${event.target.value} meters.`);
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.checkInEmail}
                onChange={() => toggleSetting('checkInEmail')}
                className="w-5 h-5 text-[#1F3C88] rounded focus:ring-[#1F3C88]"
              />
              <span className="text-sm text-gray-700">Email notifications for new check-ins</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.summary}
                onChange={() => toggleSetting('summary')}
                className="w-5 h-5 text-[#1F3C88] rounded focus:ring-[#1F3C88]"
              />
              <span className="text-sm text-gray-700">Send summary after session ends</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.weekly}
                onChange={() => toggleSetting('weekly')}
                className="w-5 h-5 text-[#1F3C88] rounded focus:ring-[#1F3C88]"
              />
              <span className="text-sm text-gray-700">Weekly attendance reports</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-[#1F3C88]" size={22} />
              <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pdpa}
                  onChange={() => toggleSetting('pdpa')}
                  className="w-5 h-5 text-[#1F3C88] rounded focus:ring-[#1F3C88]"
                />
                <span className="text-sm text-gray-700">PDPA consent notice enabled</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.offlineQueue}
                  onChange={() => toggleSetting('offlineQueue')}
                  className="w-5 h-5 text-[#1F3C88] rounded focus:ring-[#1F3C88]"
                />
                <span className="text-sm text-gray-700">Allow offline attendance queue</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Link className="text-[#1F3C88]" size={22} />
              <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  toggleSetting('ssoActive');
                  setFeedback(settings.ssoActive ? 'University SSO marked inactive in this mockup.' : 'University SSO marked active in this mockup.');
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors"
              >
                SSO: {settings.ssoActive ? 'Active' : 'Inactive'}
              </button>
              <button
                onClick={() => {
                  toggleSetting('lmsLinked');
                  setFeedback(settings.lmsLinked ? 'Google Classroom link removed.' : 'Google Classroom linked for attendance grade sync.');
                }}
                className="w-full px-4 py-2.5 bg-[#1F3C88] text-white rounded-lg text-left hover:bg-[#152d66] transition-colors"
              >
                {settings.lmsLinked ? 'Unlink Google Classroom' : 'Link Google Classroom'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="text-[#1F3C88]" size={22} />
              <h3 className="text-lg font-semibold text-gray-900">Account Request</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Mock admin validation flow for professor account creation.</p>
            <button
              onClick={() => setFeedback('Account creation request submitted for admin validation.')}
              className="w-full px-4 py-2.5 bg-[#2ECC71] text-white rounded-lg font-medium hover:bg-[#27ae60] transition-colors"
            >
              Request Account
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setFeedback(`Settings saved locally: QR ${qrInterval}s, auto-end ${autoEnd}m, geofence ${geofence}m.`)}
            className="px-6 py-3 bg-[#1F3C88] text-white rounded-lg font-medium hover:bg-[#152d66] transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
