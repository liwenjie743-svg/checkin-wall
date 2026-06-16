import React, { useState, useEffect, useRef, useCallback } from 'react';

const AVATAR_COLORS = [
  'var(--pop-magenta)',
  'var(--pop-blue)',
  'var(--pop-cyan)',
  'var(--pop-orange)',
  'var(--pop-purple)',
  'var(--pop-yellow)'
];

function getAvatarColor(username) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatTime(ts) {
  const d = new Date(ts);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

export default function Dashboard({ weekDays, checkins, checkedCount, streak, onCheckIn, user, screenWakeOn, onToggleScreenWake, onCheckinComment }) {
  const todayKey = '2026-06-16';
  const [now, setNow] = useState(new Date());
  const [detailDate, setDetailDate] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Fullscreen clock states
  const [isFullscreenClock, setIsFullscreenClock] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [showRestModal, setShowRestModal] = useState(false);
  const focusTimerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fullscreen clock focus timer
  useEffect(() => {
    if (isFullscreenClock && !showRestModal) {
      focusTimerRef.current = setInterval(() => {
        setFocusSeconds(s => {
          const next = s + 1;
          if (next >= 3600) { // 60 minutes
            setShowRestModal(true);
            clearInterval(focusTimerRef.current);
          }
          return next;
        });
      }, 1000);
    } else {
      if (focusTimerRef.current) {
        clearInterval(focusTimerRef.current);
        focusTimerRef.current = null;
      }
    }
    return () => {
      if (focusTimerRef.current) {
        clearInterval(focusTimerRef.current);
      }
    };
  }, [isFullscreenClock, showRestModal]);

  const enterFullscreenClock = useCallback(() => {
    setFocusSeconds(0);
    setShowRestModal(false);
    setShowStartModal(true);
    setIsFullscreenClock(true);
  }, []);

  const exitFullscreenClock = useCallback(() => {
    setIsFullscreenClock(false);
    setFocusSeconds(0);
    setShowRestModal(false);
    setShowStartModal(false);
  }, []);

  const closeStartModal = useCallback(() => {
    setShowStartModal(false);
  }, []);

  const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
  const dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  const detailCheckin = detailDate ? checkins[detailDate] : null;

  const handleDayClick = (dayKey) => {
    if (!user) return;
    const checkin = checkins[dayKey];
    if (checkin && (checkin.isPublic || (user && checkin.username === user?.username))) {
      setDetailDate(dayKey);
    } else {
      onCheckIn(dayKey);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !detailDate) return;
    onCheckinComment(detailDate, commentText.trim());
    setCommentText('');
  };

  return (
    <div data-component="Dashboard" data-od-id="dashboard">
      {/* Full Screen Clock */}
      <div className="pop-card mb-lg" style={{ padding: '32px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 10vw, 96px)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: 'var(--pop-black)',
          textShadow: '4px 4px 0px var(--pop-magenta)'
        }}>
          {timeStr}
        </div>
        <div style={{
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginTop: '12px',
          color: 'var(--muted)'
        }}>
          {dateStr}
        </div>
        <div className="mt-md flex gap-md justify-center" style={{ flexWrap: 'wrap' }}>
          <button
            className={`pop-btn ${screenWakeOn ? 'primary' : ''}`}
            style={{ padding: '8px 20px', fontSize: '14px' }}
            onClick={onToggleScreenWake}
          >
            {screenWakeOn ? '屏幕常亮：开' : '屏幕常亮：关'}
          </button>
          <button
            className="pop-btn accent"
            style={{ padding: '8px 20px', fontSize: '14px' }}
            onClick={enterFullscreenClock}
          >
            全屏展示时钟
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-md mb-lg" style={{ flexWrap: 'wrap' }}>
        <div className="pop-card tilt-1" style={{ flex: 1, minWidth: 160, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--pop-magenta)' }}>
            {checkedCount}/7
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>
            本周打卡
          </div>
        </div>
        <div className="pop-card tilt-2" style={{ flex: 1, minWidth: 160, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--pop-blue)' }}>
            {streak}
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>
            连续天数
          </div>
        </div>
        <div className="pop-card tilt-3" style={{ flex: 1, minWidth: 160, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--pop-orange)' }}>
            {Math.round((checkedCount / 7) * 100)}%
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>
            完成率
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="pop-card" style={{ padding: '24px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '20px',
          color: 'var(--pop-black)'
        }}>
          2026年6月16日 - 22日
        </h2>

        {!user && (
          <div className="comic-bubble magenta mb-lg" style={{ maxWidth: 480 }}>
            <p style={{ fontWeight: 700 }}>登录后可以打卡并上传每日学习图片哦！</p>
          </div>
        )}

        <div className="calendar-grid">
          {weekDays.map((day, idx) => {
            const isChecked = !!checkins[day.key];
            const isToday = day.key === todayKey;
            const checkin = checkins[day.key];
            const isPublic = checkin?.isPublic ?? true;
            return (
              <div
                key={day.key}
                className={`day-card ${isChecked ? 'checked' : ''}`}
                style={{
                  transform: idx % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
                  cursor: user ? 'pointer' : 'default'
                }}
                onClick={() => handleDayClick(day.key)}
              >
                {isChecked && (
                  <>
                    <div className="check-badge" />
                    {!isPublic && (
                      <div style={{
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        background: 'var(--pop-black)',
                        color: 'var(--pop-white)',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        border: '2px solid var(--pop-black)'
                      }}>
                        私密
                      </div>
                    )}
                  </>
                )}
                <span className="day-number" style={{ color: isToday ? 'var(--pop-magenta)' : undefined }}>
                  {day.date}
                </span>
                <span className="day-weekday">{day.weekday}</span>
                {isChecked && checkin?.image && (
                  <img
                    src={checkin.image}
                    alt=""
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.25,
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-lg flex gap-md" style={{ flexWrap: 'wrap' }}>
          <div className="flex items-center gap-sm">
            <div style={{ width: 20, height: 20, background: 'var(--pop-cyan)', border: '2px solid var(--pop-black)' }} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>已打卡</span>
          </div>
          <div className="flex items-center gap-sm">
            <div style={{ width: 20, height: 20, background: 'var(--pop-white)', border: '2px solid var(--pop-black)' }} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>未打卡</span>
          </div>
          <div className="flex items-center gap-sm">
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--pop-magenta)', border: '2px solid var(--pop-black)' }} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>今日</span>
          </div>
          <div className="flex items-center gap-sm">
            <div style={{ width: 20, height: 20, background: 'var(--pop-black)', border: '2px solid var(--pop-black)' }} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>私密</span>
          </div>
        </div>
      </div>

      {/* Check-in Detail Modal */}
      {detailDate && detailCheckin && (
        <div className="modal-overlay" onClick={() => setDetailDate(null)}>
          <div className="modal-content" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ background: 'var(--pop-cyan)' }}>
              <h2>打卡详情 - {detailDate}</h2>
              <button className="modal-close" onClick={() => setDetailDate(null)}>×</button>
            </div>
            <div className="modal-body">
              {detailCheckin.image && (
                <div className="mb-md">
                  <img
                    src={detailCheckin.image}
                    alt="打卡图片"
                    style={{ width: '100%', border: '3px solid var(--pop-black)', boxShadow: 'var(--shadow-pop)' }}
                  />
                </div>
              )}
              {detailCheckin.note && (
                <div className="comic-bubble yellow mb-md">
                  <p style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.5 }}>{detailCheckin.note}</p>
                </div>
              )}

              {/* Comments */}
              <div style={{ borderTop: '3px solid var(--pop-black)', paddingTop: '16px', marginTop: '16px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  评论 ({(detailCheckin.comments || []).length})
                </h3>
                <div className="flex flex-col gap-sm" style={{ maxHeight: 200, overflowY: 'auto', marginBottom: '12px' }}>
                  {(detailCheckin.comments || []).length === 0 ? (
                    <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 500 }}>暂无评论，来抢沙发吧！</p>
                  ) : (
                    (detailCheckin.comments || []).map(c => (
                      <div key={c.id} className="flex gap-sm items-start">
                        <div
                          className="chat-avatar"
                          style={{ background: getAvatarColor(c.username), width: 28, height: 28, fontSize: '12px', flexShrink: 0 }}
                        >
                          {c.username.slice(0, 1).toUpperCase()}
                        </div>
                        <div className="chat-bubble" style={{ padding: '6px 10px', maxWidth: '80%' }}>
                          <div className="chat-meta" style={{ fontSize: '11px' }}>
                            @{c.username} · {formatTime(c.timestamp)}
                          </div>
                          <div style={{ fontSize: '14px', lineHeight: 1.4, wordBreak: 'break-word' }}>
                            {c.text}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {user && (
                  <form onSubmit={handleCommentSubmit} className="flex gap-sm">
                    <input
                      className="pop-input"
                      type="text"
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="写下你的评论..."
                      style={{ flex: 1, padding: '8px 12px', fontSize: '14px' }}
                    />
                    <button
                      type="submit"
                      className="pop-btn primary"
                      disabled={!commentText.trim()}
                      style={{ padding: '8px 16px', fontSize: '14px' }}
                    >
                      评论
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Clock Overlay */}
      {isFullscreenClock && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}
        >
          {/* Ben-day dots background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, var(--pop-magenta) 2px, transparent 2px)',
              backgroundSize: '16px 16px',
              opacity: 0.15,
              pointerEvents: 'none'
            }}
          />

          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 18vw, 200px)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: 'var(--pop-black)',
            textShadow: '6px 6px 0px var(--pop-magenta)',
            zIndex: 1
          }}>
            {timeStr}
          </div>

          <div style={{
            fontSize: 'clamp(18px, 3vw, 32px)',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginTop: '24px',
            color: 'var(--muted)',
            zIndex: 1
          }}>
            {dateStr}
          </div>

          <div style={{ marginTop: '60px', zIndex: 1 }}>
            <button
              className="pop-btn primary"
              style={{ padding: '14px 36px', fontSize: '20px' }}
              onClick={exitFullscreenClock}
            >
              退出全屏时钟
            </button>
          </div>
        </div>
      )}

      {/* Start Focus Modal with Cat */}
      {showStartModal && (
        <div className="modal-overlay" style={{ zIndex: 3000 }} onClick={closeStartModal}>
          <div className="modal-content" style={{ maxWidth: 480, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ background: 'var(--pop-cyan)' }}>
              <h2>专注开始</h2>
              <button className="modal-close" onClick={closeStartModal}>×</button>
            </div>
            <div className="modal-body" style={{ padding: '32px 24px' }}>
              <img
                src="/rest-cat.png"
                alt="专注猫咪"
                style={{
                  maxWidth: '100%',
                  maxHeight: 280,
                  marginBottom: '24px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              />
              <div className="comic-bubble yellow" style={{ display: 'inline-block', marginBottom: '16px' }}>
                <p style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.4 }}>
                  专注学习开始！让我们一起加油吧～
                </p>
              </div>
              <div className="starburst" style={{ background: 'var(--pop-magenta)', fontSize: '18px', marginBottom: '16px', color: 'var(--pop-white)' }}>
                GO GO GO!
              </div>
              <div className="mt-lg">
                <button className="pop-btn primary" onClick={closeStartModal}>
                  开始专注
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest Reminder Modal with Cat */}
      {showRestModal && (
        <div className="modal-overlay" style={{ zIndex: 3000 }} onClick={exitFullscreenClock}>
          <div className="modal-content" style={{ maxWidth: 480, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ background: 'var(--pop-yellow)' }}>
              <h2>休息提醒</h2>
              <button className="modal-close" onClick={exitFullscreenClock}>×</button>
            </div>
            <div className="modal-body" style={{ padding: '32px 24px' }}>
              <img
                src="/rest-cat.png"
                alt="休息猫咪"
                style={{
                  maxWidth: '100%',
                  maxHeight: 280,
                  marginBottom: '24px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              />
              <div className="comic-bubble magenta" style={{ display: 'inline-block', marginBottom: '16px' }}>
                <p style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.4 }}>
                  你已经专注学习60分钟啦！该休息一下啦～
                </p>
              </div>
              <div className="starburst" style={{ background: 'var(--pop-cyan)', fontSize: '18px', marginBottom: '16px' }}>
                MEOW~
              </div>
              <p style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 500 }}>
                起来活动活动，喝杯水，看看远方吧！
              </p>
              <div className="mt-lg">
                <button className="pop-btn primary" onClick={exitFullscreenClock}>
                  好的，去休息
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
