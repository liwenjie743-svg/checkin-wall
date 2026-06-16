import React, { useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  clearCurrentUser,
  getCheckins,
  saveCheckin,
  getCheckinForDate,
  addCheckinComment,
  getMessages,
  addMessage,
  addReply,
  getRandomEncouragement
} from './utils/storage.js';
import Dashboard from './components/Dashboard.jsx';
import AuthModal from './components/AuthModal.jsx';
import CheckInModal from './components/CheckInModal.jsx';
import FocusTimer from './components/FocusTimer.jsx';
import ChatBoard from './components/ChatBoard.jsx';

const WEEK_DAYS = [
  { date: 16, weekday: '周二', key: '2026-06-16' },
  { date: 17, weekday: '周三', key: '2026-06-17' },
  { date: 18, weekday: '周四', key: '2026-06-18' },
  { date: 19, weekday: '周五', key: '2026-06-19' },
  { date: 20, weekday: '周六', key: '2026-06-20' },
  { date: 21, weekday: '周日', key: '2026-06-21' },
  { date: 22, weekday: '周一', key: '2026-06-22' },
];

export default function App(qoderProps) {
  const [user, setUser] = useState(getCurrentUser);
  const [view, setView] = useState('dashboard'); // dashboard | timer | chat
  const [showAuth, setShowAuth] = useState(false);
  const [checkinDate, setCheckinDate] = useState(null);
  const [encouragement, setEncouragement] = useState(null);
  const [checkins, setCheckins] = useState(getCheckins());
  const [messages, setMessages] = useState(getMessages());
  const [wakeLock, setWakeLock] = useState(null);
  const [screenWakeOn, setScreenWakeOn] = useState(false);

  // Sync checkins from storage
  const refreshCheckins = useCallback(() => {
    setCheckins(getCheckins());
  }, []);

  const refreshMessages = useCallback(() => {
    setMessages(getMessages());
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    setShowAuth(false);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setUser(null);
    setView('dashboard');
  };

  const handleCheckIn = (dateKey) => {
    setCheckinDate(dateKey);
  };

  const handleCheckInComplete = (dateKey, data) => {
    saveCheckin(dateKey, {
      date: dateKey,
      image: data.image || null,
      note: data.note || '',
      isPublic: data.isPublic ?? true,
      checkedAt: Date.now(),
      comments: []
    });
    refreshCheckins();
    setCheckinDate(null);
    setEncouragement(getRandomEncouragement());
  };

  const handleCheckinComment = (dateKey, text) => {
    if (!user || !text.trim()) return;
    addCheckinComment(dateKey, {
      username: user.username,
      text: text.trim()
    });
    refreshCheckins();
  };

  const handleSendMessage = (text, image) => {
    if (!user) return;
    if (!text.trim() && !image) return;
    addMessage({
      username: user.username,
      text: text.trim(),
      image: image || null
    });
    refreshMessages();
  };

  const handleReply = (messageId, text) => {
    if (!user || !text.trim()) return;
    addReply(messageId, {
      username: user.username,
      text: text.trim()
    });
    refreshMessages();
  };

  // Request wake lock when timer is active or screen wake is toggled on dashboard
  useEffect(() => {
    let lock = null;
    const requestLock = async () => {
      if ('wakeLock' in navigator) {
        const needLock = view === 'timer' || (view === 'dashboard' && screenWakeOn);
        if (needLock) {
          try {
            lock = await navigator.wakeLock.request('screen');
            setWakeLock(lock);
          } catch {
            // Wake lock not supported or denied
          }
        }
      }
    };
    requestLock();

    return () => {
      if (lock) {
        lock.release();
        setWakeLock(null);
      }
    };
  }, [view, screenWakeOn]);

  // Poll for new messages every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const latest = getMessages();
      if (latest.length !== messages.length) {
        setMessages(latest);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const checkedCount = WEEK_DAYS.filter(d => checkins[d.key]).length;
  const streak = (() => {
    let s = 0;
    for (let i = WEEK_DAYS.length - 1; i >= 0; i--) {
      if (checkins[WEEK_DAYS[i].key]) s++;
      else if (i < WEEK_DAYS.length - 1) break;
    }
    return s;
  })();

  return (
    <div className={["app-container ben-day-bg", qoderProps?.className].filter(Boolean).join(" ")} style={qoderProps?.style} data-qoder-id={qoderProps?.["data-qoder-id"]} data-qoder-source={qoderProps?.["data-qoder-source"]}>
      <header className="app-header" data-component="App Header" data-od-id="app-header" data-qoder-id="qel-app-header-23e4409e" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-app-header-23e4409e&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;app-header&quot;,&quot;loc&quot;:{&quot;line&quot;:155,&quot;column&quot;:7}}">
        <h1 onClick={() => setView('dashboard')} style={{ cursor: 'pointer' }} data-qoder-id="qel-h1-d6c107b3" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-h1-d6c107b3&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;h1&quot;,&quot;loc&quot;:{&quot;line&quot;:156,&quot;column&quot;:9}}">
          @子为的打卡墙
        </h1>
        <div className="flex items-center gap-md" data-qoder-id="qel-flex-04232d72" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-04232d72&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:159,&quot;column&quot;:9}}">
          {user ? (
            <>
              <span style={{ fontWeight: 700 }} data-qoder-id="qel-span-c6dc1ce7" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-span-c6dc1ce7&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;span&quot;,&quot;loc&quot;:{&quot;line&quot;:162,&quot;column&quot;:15}}">@{user.username}</span>
              <button className="pop-btn cyan" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={() => setView('timer')} data-qoder-id="qel-pop-btn-c8a5f4ac" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-c8a5f4ac&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:163,&quot;column&quot;:15}}">
                专注倒计时
              </button>
              <button className="pop-btn" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={() => setView('chat')} data-qoder-id="qel-pop-btn-c9a5f63f" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-c9a5f63f&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:166,&quot;column&quot;:15}}">
                留言板
              </button>
              <button className="pop-btn accent" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={handleLogout} data-qoder-id="qel-pop-btn-cea5fe1e" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-cea5fe1e&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:169,&quot;column&quot;:15}}">
                退出
              </button>
            </>
          ) : (
            <button className="pop-btn primary" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={() => setShowAuth(true)} data-qoder-id="qel-pop-btn-cfa5ffb1" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-cfa5ffb1&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:174,&quot;column&quot;:13}}">
              登录 / 注册
            </button>
          )}
        </div>
      </header>

      <main className="app-main" data-qoder-id="qel-app-main-72a8f2b9" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-app-main-72a8f2b9&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;app-main&quot;,&quot;loc&quot;:{&quot;line&quot;:181,&quot;column&quot;:7}}">
        {!user && view !== 'dashboard' ? (
          <div className="text-center mt-lg" data-qoder-id="qel-text-center-71f497fa" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-text-center-71f497fa&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;text-center&quot;,&quot;loc&quot;:{&quot;line&quot;:183,&quot;column&quot;:11}}">
            <div className="comic-bubble magenta" style={{ display: 'inline-block', maxWidth: 400 }} data-qoder-id="qel-comic-bubble-a9ee944e" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-comic-bubble-a9ee944e&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;comic-bubble&quot;,&quot;loc&quot;:{&quot;line&quot;:184,&quot;column&quot;:13}}">
              <p style={{ fontSize: '18px', fontWeight: 700 }} data-qoder-id="qel-p-291dd7c8" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-p-291dd7c8&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;p&quot;,&quot;loc&quot;:{&quot;line&quot;:185,&quot;column&quot;:15}}">请先登录后再使用该功能！</p>
            </div>
            <div className="mt-lg" data-qoder-id="qel-mt-lg-c5561743" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-mt-lg-c5561743&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;mt-lg&quot;,&quot;loc&quot;:{&quot;line&quot;:187,&quot;column&quot;:13}}">
              <button className="pop-btn primary" onClick={() => setShowAuth(true)} data-qoder-id="qel-pop-btn-763dce44" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-763dce44&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:188,&quot;column&quot;:15}}">
                立即登录
              </button>
            </div>
          </div>
        ) : (
          <>
            {view === 'dashboard' && (
              <Dashboard
                weekDays={WEEK_DAYS}
                checkins={checkins}
                checkedCount={checkedCount}
                streak={streak}
                onCheckIn={handleCheckIn}
                user={user}
                screenWakeOn={screenWakeOn}
                onToggleScreenWake={() => setScreenWakeOn(v => !v)}
                onCheckinComment={handleCheckinComment}
               data-qoder-id="qel-dashboard-b5823267" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-dashboard-b5823267&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;dashboard&quot;,&quot;loc&quot;:{&quot;line&quot;:196,&quot;column&quot;:15}}"/>
            )}
            {view === 'timer' && <FocusTimer onBack={() => setView('dashboard')}  data-qoder-id="qel-focustimer-7885663e" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-focustimer-7885663e&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;focustimer&quot;,&quot;loc&quot;:{&quot;line&quot;:208,&quot;column&quot;:34}}"/>}
            {view === 'chat' && (
              <ChatBoard
                messages={messages}
                currentUser={user}
                onSend={handleSendMessage}
                onReply={handleReply}
               data-qoder-id="qel-chatboard-538bdf05" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-chatboard-538bdf05&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;chatboard&quot;,&quot;loc&quot;:{&quot;line&quot;:210,&quot;column&quot;:15}}"/>
            )}
          </>
        )}
      </main>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
         data-qoder-id="qel-authmodal-5ba0047e" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-authmodal-5ba0047e&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;authmodal&quot;,&quot;loc&quot;:{&quot;line&quot;:222,&quot;column&quot;:9}}"/>
      )}

      {checkinDate && (
        <CheckInModal
          dateKey={checkinDate}
          existing={getCheckinForDate(checkinDate)}
          onClose={() => setCheckinDate(null)}
          onComplete={handleCheckInComplete}
         data-qoder-id="qel-checkinmodal-c4fab232" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-checkinmodal-c4fab232&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;checkinmodal&quot;,&quot;loc&quot;:{&quot;line&quot;:229,&quot;column&quot;:9}}"/>
      )}

      {encouragement && (
        <div className="modal-overlay" onClick={() => setEncouragement(null)} data-qoder-id="qel-modal-overlay-588b9d28" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-overlay-588b9d28&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;modal-overlay&quot;,&quot;loc&quot;:{&quot;line&quot;:238,&quot;column&quot;:9}}">
          <div className="modal-content" style={{ maxWidth: 420, textAlign: 'center' }} onClick={e => e.stopPropagation()} data-qoder-id="qel-modal-content-50265882" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-content-50265882&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;modal-content&quot;,&quot;loc&quot;:{&quot;line&quot;:239,&quot;column&quot;:11}}">
            <div className="modal-header" style={{ background: 'var(--pop-magenta)', color: 'var(--pop-white)' }} data-qoder-id="qel-modal-header-bf138237" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-header-bf138237&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;modal-header&quot;,&quot;loc&quot;:{&quot;line&quot;:240,&quot;column&quot;:13}}">
              <h2 data-qoder-id="qel-h2-2f05aab2" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-h2-2f05aab2&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;h2&quot;,&quot;loc&quot;:{&quot;line&quot;:241,&quot;column&quot;:15}}">打卡成功!</h2>
              <button className="modal-close" onClick={() => setEncouragement(null)} data-qoder-id="qel-modal-close-5e84b4c5" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-close-5e84b4c5&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;modal-close&quot;,&quot;loc&quot;:{&quot;line&quot;:242,&quot;column&quot;:15}}">×</button>
            </div>
            <div className="modal-body" style={{ padding: '32px 24px' }} data-qoder-id="qel-modal-body-d00dbb3b" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-body-d00dbb3b&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;modal-body&quot;,&quot;loc&quot;:{&quot;line&quot;:244,&quot;column&quot;:13}}">
              <div className="starburst" style={{ marginBottom: 24, background: 'var(--pop-yellow)' }} data-qoder-id="qel-starburst-36e94f6c" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-starburst-36e94f6c&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;starburst&quot;,&quot;loc&quot;:{&quot;line&quot;:245,&quot;column&quot;:15}}">
                POW!
              </div>
              <div className="comic-bubble cyan" style={{ display: 'inline-block' }} data-qoder-id="qel-comic-bubble-21f60cfb" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-comic-bubble-21f60cfb&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;comic-bubble&quot;,&quot;loc&quot;:{&quot;line&quot;:248,&quot;column&quot;:15}}">
                <p style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.4 }} data-qoder-id="qel-p-2b201985" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-p-2b201985&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;p&quot;,&quot;loc&quot;:{&quot;line&quot;:249,&quot;column&quot;:17}}">{encouragement}</p>
              </div>
              <div className="mt-lg" data-qoder-id="qel-mt-lg-5d50f65d" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-mt-lg-5d50f65d&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;mt-lg&quot;,&quot;loc&quot;:{&quot;line&quot;:251,&quot;column&quot;:15}}">
                <button className="pop-btn primary" onClick={() => setEncouragement(null)} data-qoder-id="qel-pop-btn-e6386e66" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-e6386e66&quot;,&quot;filePath&quot;:&quot;react-vite/src/App.jsx&quot;,&quot;componentName&quot;:&quot;App&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:252,&quot;column&quot;:17}}">
                  继续加油
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
