import { useCallback, useState } from 'react';

import { DashboardHome } from './components/DashboardHome';
import { HistoryView } from './components/HistoryView';
import { LiveSession } from './components/LiveSession';
import { SessionsView } from './components/SessionsView';
import { SettingsView } from './components/SettingsView';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { ViewToggle } from './components/ViewToggle';
import { MobileApp } from './components/mobile/MobileApp';

type ViewMode = 'desktop' | 'mobile';
type Screen = 'dashboard' | 'session' | 'history' | 'sessions' | 'settings';
type SessionType = 'Start' | 'Middle' | 'End';

interface ActiveSession {
  courseId: string;
  sessionType: SessionType;
}

export default function App() {
  const [view, setView] = useState<ViewMode>('desktop');
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [historyCourse, setHistoryCourse] = useState<string>('');

  const handleCreateSession = useCallback((courseId: string, sessionType: SessionType = 'Start') => {
    setActiveSession({ courseId, sessionType });
    setActiveScreen('session');
  }, []);

  const handleEndSession = useCallback(() => {
    setActiveSession(null);
    setActiveScreen('dashboard');
  }, []);

  const handleNavigate = useCallback((screen: Screen) => {
    setActiveScreen(screen);
    if (screen !== 'session') {
      setActiveSession(null);
    }
  }, []);

  const handleViewHistory = useCallback((courseId = '') => {
    setHistoryCourse(courseId);
    setActiveSession(null);
    setActiveScreen('history');
  }, []);

  const handleLogout = useCallback(() => {
    setActiveSession(null);
    setHistoryCourse('');
    setActiveScreen('dashboard');
  }, []);

  return (
    <>
      {view === 'desktop' ? (
        <div className="min-h-screen bg-gray-50">
          <Sidebar activeScreen={activeScreen} onNavigate={handleNavigate} onLogout={handleLogout} />

          <div className="ml-64">
            <TopHeader
              professorName="Dr. Kevin Glaentzlin"
              facultyName="Faculty of Computer Science"
              onProfileClick={() => handleNavigate('settings')}
            />

            <main className="p-8">
              {activeScreen === 'dashboard' && (
                <DashboardHome
                  onCreateSession={handleCreateSession}
                  onViewHistory={handleViewHistory}
                />
              )}

              {activeScreen === 'session' && activeSession && (
                <LiveSession
                  courseId={activeSession.courseId}
                  sessionType={activeSession.sessionType}
                  onEndSession={handleEndSession}
                />
              )}

              {activeScreen === 'history' && <HistoryView initialCourse={historyCourse} />}
              {activeScreen === 'sessions' && <SessionsView onStartSession={handleCreateSession} />}
              {activeScreen === 'settings' && <SettingsView />}
            </main>
          </div>
        </div>
      ) : (
        <MobileApp />
      )}

      <ViewToggle view={view} onToggle={setView} />
    </>
  );
}
