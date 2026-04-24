import { useEffect, useMemo, useState } from 'react';
import { Download, Calendar, Filter, MapPin, ShieldCheck, X } from 'lucide-react';
import { downloadCsv } from '../lib/exportCsv';

interface AttendanceRecord {
  id: string;
  date: string;
  time: string;
  courseId: string;
  sessionType: string;
  totalAttendees: number;
  expectedStudents: number;
  gpsVerified: number;
  selfieVerified: number;
}

interface HistoryViewProps {
  initialCourse?: string;
}

export function HistoryView({ initialCourse = '' }: HistoryViewProps) {
  const [courseFilter, setCourseFilter] = useState(initialCourse);
  const [dateFilter, setDateFilter] = useState('');
  const [sessionTypeFilter, setSessionTypeFilter] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [feedback, setFeedback] = useState('');
  const [records] = useState<AttendanceRecord[]>([
    {
      id: '1',
      date: '2026-02-14',
      time: '09:00 AM',
      courseId: 'CSS323',
      sessionType: 'Start',
      totalAttendees: 42,
      expectedStudents: 45,
      gpsVerified: 41,
      selfieVerified: 40,
    },
    {
      id: '2',
      date: '2026-02-14',
      time: '11:30 AM',
      courseId: 'CS201',
      sessionType: 'Middle',
      totalAttendees: 58,
      expectedStudents: 62,
      gpsVerified: 57,
      selfieVerified: 55,
    },
    {
      id: '3',
      date: '2026-02-13',
      time: '14:00 PM',
      courseId: 'CS305',
      sessionType: 'Start',
      totalAttendees: 35,
      expectedStudents: 38,
      gpsVerified: 34,
      selfieVerified: 34,
    },
    {
      id: '4',
      date: '2026-02-13',
      time: '10:00 AM',
      courseId: 'CSS323',
      sessionType: 'End',
      totalAttendees: 41,
      expectedStudents: 45,
      gpsVerified: 39,
      selfieVerified: 38,
    },
    {
      id: '5',
      date: '2026-02-12',
      time: '13:00 PM',
      courseId: 'CS401',
      sessionType: 'Start',
      totalAttendees: 50,
      expectedStudents: 54,
      gpsVerified: 49,
      selfieVerified: 47,
    },
    {
      id: '6',
      date: '2026-02-12',
      time: '09:00 AM',
      courseId: 'CS150',
      sessionType: 'Middle',
      totalAttendees: 72,
      expectedStudents: 78,
      gpsVerified: 70,
      selfieVerified: 69,
    },
    {
      id: '7',
      date: '2026-02-11',
      time: '15:30 PM',
      courseId: 'CS340',
      sessionType: 'Start',
      totalAttendees: 38,
      expectedStudents: 41,
      gpsVerified: 37,
      selfieVerified: 36,
    },
    {
      id: '8',
      date: '2026-02-11',
      time: '11:00 AM',
      courseId: 'CSS323',
      sessionType: 'Start',
      totalAttendees: 43,
      expectedStudents: 45,
      gpsVerified: 42,
      selfieVerified: 42,
    },
  ]);

  useEffect(() => {
    setCourseFilter(initialCourse);
  }, [initialCourse]);

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const matchesCourse = !courseFilter || record.courseId === courseFilter;
        const matchesDate = !dateFilter || record.date === dateFilter;
        const matchesType = !sessionTypeFilter || record.sessionType.toLowerCase() === sessionTypeFilter;
        return matchesCourse && matchesDate && matchesType;
      }),
    [courseFilter, dateFilter, records, sessionTypeFilter],
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const toCsvRows = (items: AttendanceRecord[]) =>
    items.map((record) => ({
      date: record.date,
      time: record.time,
      course_id: record.courseId,
      session_type: record.sessionType,
      attendees: record.totalAttendees,
      expected_students: record.expectedStudents,
      attendance_rate: `${Math.round((record.totalAttendees / record.expectedStudents) * 100)}%`,
      gps_verified: record.gpsVerified,
      selfie_verified: record.selfieVerified,
    }));

  const handleExport = (scope: string, items: AttendanceRecord[]) => {
    const safeScope = scope.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    downloadCsv(`attendance-${safeScope || 'records'}.csv`, toCsvRows(items));
    setFeedback(`${scope} exported as CSV (${items.length} record${items.length === 1 ? '' : 's'}).`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Attendance History</h1>
          <p className="text-gray-600 mt-1">
            {filteredRecords.length} records visible{courseFilter ? ` for ${courseFilter}` : ''}.
          </p>
        </div>
        <button
          onClick={() => handleExport('All visible records', filteredRecords)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1F3C88] text-white rounded-lg font-medium hover:bg-[#152d66] transition-colors shadow-sm"
        >
          <Download size={18} />
          Export All Records
        </button>
      </div>

      {feedback && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {feedback}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>
            <select
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
            >
              <option value="">All Courses</option>
              <option value="CSS323">CSS323</option>
              <option value="CS201">CS201</option>
              <option value="CS305">CS305</option>
              <option value="CS401">CS401</option>
              <option value="CS150">CS150</option>
              <option value="CS340">CS340</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="relative">
              <input
                type="date"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
              />
              <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Type
            </label>
            <select
              value={sessionTypeFilter}
              onChange={(event) => setSessionTypeFilter(event.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3C88]/20 focus:border-[#1F3C88]"
            >
              <option value="">All Types</option>
              <option value="start">Start</option>
              <option value="middle">Middle</option>
              <option value="end">End</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFeedback(`Filters applied. Showing ${filteredRecords.length} matching records.`)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2ECC71] text-white rounded-lg font-medium hover:bg-[#27ae60] transition-colors shadow-sm"
            >
              <Filter size={18} />
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Time
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Course ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Session Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Total Attendees
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Rate
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Verification
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Export
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords.map((record, index) => (
              <tr
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(record.date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{record.time}</td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-[#1F3C88]">
                    {record.courseId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      record.sessionType === 'Start'
                        ? 'bg-green-100 text-green-700'
                        : record.sessionType === 'Middle'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {record.sessionType}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {record.totalAttendees}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {Math.round((record.totalAttendees / record.expectedStudents) * 100)}%
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-[#1F3C88]" />
                      {record.gpsVerified}/{record.totalAttendees} GPS
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} className="text-[#2ECC71]" />
                      {record.selfieVerified}/{record.totalAttendees} selfie
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleExport(`${record.courseId} ${record.sessionType}`, [record]);
                    }}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors group relative"
                    title="Export to CSV"
                  >
                    <Download size={16} className="text-gray-600 group-hover:text-[#1F3C88]" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                  No records match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedRecord.courseId} · {selectedRecord.sessionType}
                </h2>
                <p className="text-sm text-gray-600">{formatDate(selectedRecord.date)} at {selectedRecord.time}</p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                aria-label="Close session details"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-2xl font-bold text-[#1F3C88]">{selectedRecord.totalAttendees}</div>
                <div className="text-sm text-gray-600">Students present</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-2xl font-bold text-[#2ECC71]">
                  {Math.round((selectedRecord.totalAttendees / selectedRecord.expectedStudents) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Attendance rate</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-2xl font-bold text-gray-900">{selectedRecord.gpsVerified}</div>
                <div className="text-sm text-gray-600">GPS verified</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-2xl font-bold text-gray-900">{selectedRecord.selfieVerified}</div>
                <div className="text-sm text-gray-600">Selfies verified</div>
              </div>
            </div>
            <div className="p-6 pt-0 flex justify-end gap-3">
              <button
                onClick={() => handleExport(`${selectedRecord.courseId} detail`, [selectedRecord])}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1F3C88] text-white rounded-lg font-medium hover:bg-[#152d66] transition-colors"
              >
                <Download size={16} />
                Export Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
