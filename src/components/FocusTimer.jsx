import React, { useState, useEffect, useRef, useCallback } from 'react';

const PRESETS = [
  { label: '10分钟', minutes: 10, color: 'var(--pop-cyan)' },
  { label: '40分钟', minutes: 40, color: 'var(--pop-magenta)' },
  { label: '60分钟', minutes: 60, color: 'var(--pop-blue)' },
];

export default function FocusTimer({ onBack, ...qoderProps }) {
  const [selectedMinutes, setSelectedMinutes] = useState(40);
  const [customMinutes, setCustomMinutes] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  const activeMinutes = isCustom ? (parseInt(customMinutes, 10) || 0) : selectedMinutes;
  const totalSeconds = activeMinutes * 60;

  const start = useCallback(() => {
    setSecondsLeft(activeMinutes * 60);
    setIsRunning(true);
    setIsComplete(false);
  }, [activeMinutes]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (secondsLeft > 0) {
      setIsRunning(true);
    }
  }, [secondsLeft]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(0);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            // Play beep using Web Audio API
            try {
              const AudioCtx = window.AudioContext || window.webkitAudioContext;
              const ctx = new AudioCtx();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 880;
              gain.gain.value = 0.3;
              osc.start();
              osc.stop(ctx.currentTime + 0.3);
            } catch {
              // Audio not supported
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) : 0;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  const currentPreset = PRESETS.find(p => p.minutes === activeMinutes) || { color: 'var(--pop-orange)' };

  return (
    <div data-component="Focus Timer" data-od-id="focus-timer" className={["text-center", qoderProps?.className].filter(Boolean).join(" ")} style={qoderProps?.style} data-qoder-id={qoderProps?.["data-qoder-id"]} data-qoder-source={qoderProps?.["data-qoder-source"]}>
      <div className="flex items-center gap-md mb-lg" data-qoder-id="qel-flex-ba49a883" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-ba49a883&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:89,&quot;column&quot;:7}}">
        <button className="pop-btn" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={onBack} data-qoder-id="qel-pop-btn-72e2605c" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-72e2605c&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:90,&quot;column&quot;:9}}">
          ← 返回
        </button>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase'
        }} data-qoder-id="qel-h2-ca3f7d21" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-h2-ca3f7d21&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;h2&quot;,&quot;loc&quot;:{&quot;line&quot;:93,&quot;column&quot;:9}}">
          专注倒计时
        </h2>
      </div>

      {/* Presets + Custom */}
      {!isRunning && secondsLeft === 0 && !isComplete && (
        <div className="flex flex-col gap-md justify-center mb-lg" style={{ alignItems: 'center' }} data-qoder-id="qel-flex-bf49b062" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-bf49b062&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:105,&quot;column&quot;:9}}">
          <div className="flex gap-md justify-center" style={{ flexWrap: 'wrap' }} data-qoder-id="qel-flex-be49aecf" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-be49aecf&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:106,&quot;column&quot;:11}}">
            {PRESETS.map(preset => (
              <button
                key={preset.minutes}
                className={`pop-btn ${!isCustom && selectedMinutes === preset.minutes ? 'primary' : ''}`}
                onClick={() => { setSelectedMinutes(preset.minutes); setIsCustom(false); }}
               data-qoder-id="qel-button-0b0fee04" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-button-0b0fee04&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;button&quot;,&quot;loc&quot;:{&quot;line&quot;:108,&quot;column&quot;:15}}">
                {preset.label}
              </button>
            ))}
            <button
              className={`pop-btn ${isCustom ? 'primary' : ''}`}
              onClick={() => setIsCustom(true)}
             data-qoder-id="qel-button-020fdfd9" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-button-020fdfd9&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;button&quot;,&quot;loc&quot;:{&quot;line&quot;:116,&quot;column&quot;:13}}">
              自定义
            </button>
          </div>
          {isCustom && (
            <div className="flex items-center gap-sm" data-qoder-id="qel-flex-c349b6ae" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-c349b6ae&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:124,&quot;column&quot;:13}}">
              <input
                className="pop-input"
                type="number"
                min={1}
                max={180}
                value={customMinutes}
                onChange={e => setCustomMinutes(e.target.value)}
                placeholder="输入分钟"
                style={{ width: 140, textAlign: 'center' }}
               data-qoder-id="qel-pop-input-7b0d0848" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-input-7b0d0848&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;pop-input&quot;,&quot;loc&quot;:{&quot;line&quot;:125,&quot;column&quot;:15}}"/>
              <span style={{ fontWeight: 700, fontSize: '16px' }} data-qoder-id="qel-span-2e7c3081" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-span-2e7c3081&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;span&quot;,&quot;loc&quot;:{&quot;line&quot;:135,&quot;column&quot;:15}}">分钟</span>
            </div>
          )}
        </div>
      )}

      {/* Timer Display */}
      <div className="pop-card" style={{ padding: '40px 24px', position: 'relative', maxWidth: 500, margin: '0 auto' }} data-qoder-id="qel-pop-card-f22084c9" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-card-f22084c9&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;pop-card&quot;,&quot;loc&quot;:{&quot;line&quot;:142,&quot;column&quot;:7}}">
        <svg width="280" height="280" viewBox="0 0 280 280" style={{ margin: '0 auto', display: 'block' }} data-qoder-id="qel-svg-efadbb23" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-svg-efadbb23&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;svg&quot;,&quot;loc&quot;:{&quot;line&quot;:143,&quot;column&quot;:9}}">
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="12"
           data-qoder-id="qel-circle-687fe806" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-circle-687fe806&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;circle&quot;,&quot;loc&quot;:{&quot;line&quot;:144,&quot;column&quot;:11}}"/>
          <circle
            className="progress-ring-circle"
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke={currentPreset.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isRunning || secondsLeft > 0 ? strokeDashoffset : circumference}
            style={{ filter: 'drop-shadow(2px 2px 0px var(--pop-black))' }}
           data-qoder-id="qel-progress-ring-circle-c4f7424c" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-progress-ring-circle-c4f7424c&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;progress-ring-circle&quot;,&quot;loc&quot;:{&quot;line&quot;:152,&quot;column&quot;:11}}"/>
        </svg>

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} data-qoder-id="qel-div-bf80e570" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-bf80e570&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:167,&quot;column&quot;:9}}">
          <div className="timer-display" data-qoder-id="qel-timer-display-a08c5460" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-timer-display-a08c5460&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;timer-display&quot;,&quot;loc&quot;:{&quot;line&quot;:168,&quot;column&quot;:11}}">
            {isRunning || secondsLeft > 0 ? formatTime(secondsLeft) : formatTime(totalSeconds)}
          </div>
          {(isRunning || secondsLeft > 0) && (
            <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 8, color: 'var(--muted)' }} data-qoder-id="qel-div-cd80fb7a" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-cd80fb7a&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:172,&quot;column&quot;:13}}">
              {isRunning ? '专注中...' : '已暂停'}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-md justify-center mt-lg" style={{ flexWrap: 'wrap' }} data-qoder-id="qel-flex-03f6e7fd" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-03f6e7fd&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:180,&quot;column&quot;:7}}">
        {!isRunning && secondsLeft === 0 && !isComplete && (
          <button className="pop-btn primary" style={{ fontSize: '22px', padding: '14px 36px' }} onClick={start} data-qoder-id="qel-pop-btn-4c60120d" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-4c60120d&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:182,&quot;column&quot;:11}}">
            开始专注
          </button>
        )}
        {isRunning && (
          <button className="pop-btn cyan" style={{ fontSize: '22px', padding: '14px 36px' }} onClick={pause} data-qoder-id="qel-pop-btn-4b60107a" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-4b60107a&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:187,&quot;column&quot;:11}}">
            暂停
          </button>
        )}
        {!isRunning && secondsLeft > 0 && (
          <button className="pop-btn primary" style={{ fontSize: '22px', padding: '14px 36px' }} onClick={resume} data-qoder-id="qel-pop-btn-4a600ee7" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-4a600ee7&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:192,&quot;column&quot;:11}}">
            继续
          </button>
        )}
        {(isRunning || secondsLeft > 0 || isComplete) && (
          <button className="pop-btn" style={{ fontSize: '22px', padding: '14px 36px' }} onClick={reset} data-qoder-id="qel-pop-btn-49600d54" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-49600d54&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:197,&quot;column&quot;:11}}">
            重置
          </button>
        )}
      </div>

      {/* Completion */}
      {isComplete && (
        <div className="mt-lg" data-qoder-id="qel-mt-lg-eae81d8f" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-mt-lg-eae81d8f&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;mt-lg&quot;,&quot;loc&quot;:{&quot;line&quot;:205,&quot;column&quot;:9}}">
          <div className="starburst" style={{ background: 'var(--pop-yellow)', fontSize: '24px' }} data-qoder-id="qel-starburst-ee72ed4d" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-starburst-ee72ed4d&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;starburst&quot;,&quot;loc&quot;:{&quot;line&quot;:206,&quot;column&quot;:11}}">
            专注完成!
          </div>
          <p className="mt-md" style={{ fontSize: '18px', fontWeight: 700 }} data-qoder-id="qel-mt-md-b3323510" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-mt-md-b3323510&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;mt-md&quot;,&quot;loc&quot;:{&quot;line&quot;:209,&quot;column&quot;:11}}">
            太棒了！你刚刚专注了 {activeMinutes} 分钟！
          </p>
        </div>
      )}

      {/* Wake Lock hint */}
      <div className="mt-lg" data-qoder-id="qel-mt-lg-ebe81f22" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-mt-lg-ebe81f22&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;mt-lg&quot;,&quot;loc&quot;:{&quot;line&quot;:216,&quot;column&quot;:7}}">
        <div className="comic-bubble cyan" style={{ display: 'inline-block', maxWidth: 400 }} data-qoder-id="qel-comic-bubble-f16ee236" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-comic-bubble-f16ee236&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;comic-bubble&quot;,&quot;loc&quot;:{&quot;line&quot;:217,&quot;column&quot;:9}}">
          <p style={{ fontSize: '14px', fontWeight: 500 }} data-qoder-id="qel-p-d8591162" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-p-d8591162&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/FocusTimer.jsx&quot;,&quot;componentName&quot;:&quot;FocusTimer&quot;,&quot;elementRole&quot;:&quot;p&quot;,&quot;loc&quot;:{&quot;line&quot;:218,&quot;column&quot;:11}}">
            倒计时期间屏幕会保持常亮，让你专注学习不被打断！
          </p>
        </div>
      </div>
    </div>
  );
}
