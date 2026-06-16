import React, { useState, useRef, useEffect } from 'react';

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

function MessageItem({ msg, currentUser, onReply, ...qoderProps }) {
  const isOwn = currentUser && msg.username === currentUser.username;
  const avatarColor = getAvatarColor(msg.username);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const replies = msg.replies || [];

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(msg.id, replyText.trim());
    setReplyText('');
    setShowReply(false);
  };

  return (
    <div style={{ ...({ marginBottom: '20px' }), ...(qoderProps?.style) }} className={qoderProps?.className} data-qoder-id={qoderProps?.["data-qoder-id"]} data-qoder-source={qoderProps?.["data-qoder-source"]}>
      <div className={`chat-message ${isOwn ? 'own' : ''}`} data-qoder-id="qel-div-9a8149c1" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-9a8149c1&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:42,&quot;column&quot;:7}}">
        <div className="chat-avatar" style={{ background: avatarColor }} data-qoder-id="qel-chat-avatar-57cd95d1" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-chat-avatar-57cd95d1&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;chat-avatar&quot;,&quot;loc&quot;:{&quot;line&quot;:43,&quot;column&quot;:9}}">
          {msg.username.slice(0, 1).toUpperCase()}
        </div>
        <div className="chat-bubble" data-qoder-id="qel-chat-bubble-ab5227f7" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-chat-bubble-ab5227f7&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;chat-bubble&quot;,&quot;loc&quot;:{&quot;line&quot;:46,&quot;column&quot;:9}}">
          <div className="chat-meta" data-qoder-id="qel-chat-meta-20fc71eb" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-chat-meta-20fc71eb&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;chat-meta&quot;,&quot;loc&quot;:{&quot;line&quot;:47,&quot;column&quot;:11}}">
            @{msg.username} · {formatTime(msg.timestamp)}
          </div>
          {msg.image && (
            <div className="mb-sm" data-qoder-id="qel-mb-sm-3ee27c44" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-mb-sm-3ee27c44&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;mb-sm&quot;,&quot;loc&quot;:{&quot;line&quot;:51,&quot;column&quot;:13}}">
              <img
                src={msg.image}
                alt=""
                style={{ maxWidth: 200, maxHeight: 160, border: '3px solid var(--pop-black)', boxShadow: 'var(--shadow-pop)', display: 'block' }}
               data-qoder-id="qel-img-e86b4492" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-img-e86b4492&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;img&quot;,&quot;loc&quot;:{&quot;line&quot;:52,&quot;column&quot;:15}}"/>
            </div>
          )}
          <div style={{ fontSize: '15px', lineHeight: 1.5, wordBreak: 'break-word' }} data-qoder-id="qel-div-90813a03" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-90813a03&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:59,&quot;column&quot;:11}}">
            {msg.text}
          </div>
          <div className="mt-sm" data-qoder-id="qel-mt-sm-5465e673" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-mt-sm-5465e673&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;mt-sm&quot;,&quot;loc&quot;:{&quot;line&quot;:62,&quot;column&quot;:11}}">
            <button
              onClick={() => setShowReply(v => !v)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--pop-blue)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                letterSpacing: '0.02em'
              }}
             data-qoder-id="qel-button-30a35110" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-button-30a35110&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;button&quot;,&quot;loc&quot;:{&quot;line&quot;:63,&quot;column&quot;:13}}">
              {showReply ? '取消回复' : `回复${replies.length > 0 ? ` (${replies.length})` : ''}`}
            </button>
          </div>
        </div>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div style={{ marginLeft: 56, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }} data-qoder-id="qel-div-b97ff8bb" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-b97ff8bb&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:83,&quot;column&quot;:9}}">
          {replies.map(reply => {
            const replyOwn = currentUser && reply.username === currentUser.username;
            const replyColor = getAvatarColor(reply.username);
            return (
              <div key={reply.id} className={`chat-message ${replyOwn ? 'own' : ''}`} style={{ marginBottom: 0 }} data-qoder-id="qel-div-ba7ffa4e" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-ba7ffa4e&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:88,&quot;column&quot;:15}}">
                <div className="chat-avatar" style={{ background: replyColor, width: 32, height: 32, fontSize: '14px' }} data-qoder-id="qel-chat-avatar-aa9dc548" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-chat-avatar-aa9dc548&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;chat-avatar&quot;,&quot;loc&quot;:{&quot;line&quot;:89,&quot;column&quot;:17}}">
                  {reply.username.slice(0, 1).toUpperCase()}
                </div>
                <div className="chat-bubble" style={{ padding: '8px 12px', maxWidth: '60%' }} data-qoder-id="qel-chat-bubble-ff48a544" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-chat-bubble-ff48a544&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;chat-bubble&quot;,&quot;loc&quot;:{&quot;line&quot;:92,&quot;column&quot;:17}}">
                  <div className="chat-meta" style={{ fontSize: '11px' }} data-qoder-id="qel-chat-meta-3b70eb26" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-chat-meta-3b70eb26&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;chat-meta&quot;,&quot;loc&quot;:{&quot;line&quot;:93,&quot;column&quot;:19}}">
                    @{reply.username} · {formatTime(reply.timestamp)}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: 1.4, wordBreak: 'break-word' }} data-qoder-id="qel-div-be80009a" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-be80009a&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:96,&quot;column&quot;:19}}">
                    {reply.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reply Input */}
      {showReply && (
        <div style={{ marginLeft: 56, marginTop: 8 }} data-qoder-id="qel-div-bf80022d" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-bf80022d&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:108,&quot;column&quot;:9}}">
          <form onSubmit={handleReplySubmit} className="flex gap-sm" data-qoder-id="qel-flex-57e3b4cf" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-57e3b4cf&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:109,&quot;column&quot;:11}}">
            <input
              className="pop-input"
              type="text"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder={currentUser ? "写下你的回复..." : "登录后才能回复"}
              disabled={!currentUser}
              style={{ flex: 1, padding: '8px 12px', fontSize: '14px' }}
              autoFocus
             data-qoder-id="qel-pop-input-cc47ea95" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-input-cc47ea95&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;pop-input&quot;,&quot;loc&quot;:{&quot;line&quot;:110,&quot;column&quot;:13}}"/>
            <button
              type="submit"
              className="pop-btn primary"
              disabled={!currentUser || !replyText.trim()}
              style={{ padding: '8px 16px', fontSize: '14px' }}
             data-qoder-id="qel-pop-btn-e5ba42fb" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-e5ba42fb&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;MessageItem&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:120,&quot;column&quot;:13}}">
              回复
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function ChatBoard({ messages, currentUser, onSend, onReply, ...qoderProps }) {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    onSend(text, imagePreview);
    setText('');
    setImagePreview(null);
  };

  return (
    <div data-component="Chat Board" data-od-id="chat-board" style={qoderProps?.style} className={qoderProps?.className} data-qoder-id={qoderProps?.["data-qoder-id"]} data-qoder-source={qoderProps?.["data-qoder-source"]}>
      <div className="flex items-center gap-md mb-lg" data-qoder-id="qel-flex-fa843173" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-fa843173&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:171,&quot;column&quot;:7}}">
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase'
        }} data-qoder-id="qel-h2-bdd3dbcc" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-h2-bdd3dbcc&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;h2&quot;,&quot;loc&quot;:{&quot;line&quot;:172,&quot;column&quot;:9}}">
          留言互动板
        </h2>
        <div className="starburst" style={{ fontSize: '14px', padding: '8px 16px', background: 'var(--pop-orange)' }} data-qoder-id="qel-starburst-ae0f532a" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-starburst-ae0f532a&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;starburst&quot;,&quot;loc&quot;:{&quot;line&quot;:180,&quot;column&quot;:9}}">
          {messages.length} 条留言
        </div>
      </div>

      <div className="pop-card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 260px)', minHeight: 400 }} data-qoder-id="qel-pop-card-ed344997" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-card-ed344997&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;pop-card&quot;,&quot;loc&quot;:{&quot;line&quot;:185,&quot;column&quot;:7}}">
        {/* Messages Area */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            background: 'var(--bg)'
          }}
         data-qoder-id="qel-div-29fc7cef" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-29fc7cef&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:187,&quot;column&quot;:9}}">
          {messages.length === 0 ? (
            <div className="text-center" style={{ padding: '40px 0' }} data-qoder-id="qel-text-center-b0f2378c" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-text-center-b0f2378c&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;text-center&quot;,&quot;loc&quot;:{&quot;line&quot;:197,&quot;column&quot;:13}}">
              <div className="comic-bubble" style={{ display: 'inline-block', maxWidth: 360 }} data-qoder-id="qel-comic-bubble-019a3346" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-comic-bubble-019a3346&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;comic-bubble&quot;,&quot;loc&quot;:{&quot;line&quot;:198,&quot;column&quot;:15}}">
                <p style={{ fontSize: '16px', fontWeight: 700 }} data-qoder-id="qel-p-ad955112" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-p-ad955112&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;p&quot;,&quot;loc&quot;:{&quot;line&quot;:199,&quot;column&quot;:17}}">还没有留言，来做第一个发言的人吧！</p>
              </div>
            </div>
          ) : (
            messages.map(msg => (
              <MessageItem
                key={msg.id}
                msg={msg}
                currentUser={currentUser}
                onReply={onReply}
               data-qoder-id="qel-messageitem-5da299cc" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-messageitem-5da299cc&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;messageitem&quot;,&quot;loc&quot;:{&quot;line&quot;:204,&quot;column&quot;:15}}"/>
            ))
          )}
        </div>

        {/* Input Area */}
        <div style={{ padding: '16px 24px', borderTop: '3px solid var(--pop-black)', background: 'var(--pop-white)' }} data-qoder-id="qel-div-a2f969d3" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-a2f969d3&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:215,&quot;column&quot;:9}}">
          {imagePreview && (
            <div className="mb-sm" style={{ position: 'relative', display: 'inline-block' }} data-qoder-id="qel-mb-sm-ba125829" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-mb-sm-ba125829&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;mb-sm&quot;,&quot;loc&quot;:{&quot;line&quot;:217,&quot;column&quot;:13}}">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxHeight: 80, border: '3px solid var(--pop-black)', boxShadow: 'var(--shadow-pop)' }}
               data-qoder-id="qel-img-787e0e69" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-img-787e0e69&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;img&quot;,&quot;loc&quot;:{&quot;line&quot;:218,&quot;column&quot;:15}}"/>
              <button
                onClick={() => setImagePreview(null)}
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  background: 'var(--pop-magenta)',
                  color: 'var(--pop-white)',
                  border: '2px solid var(--pop-black)',
                  width: 24,
                  height: 24,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
               data-qoder-id="qel-button-f0a94194" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-button-f0a94194&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;button&quot;,&quot;loc&quot;:{&quot;line&quot;:223,&quot;column&quot;:15}}">
                ×
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-md" data-qoder-id="qel-flex-0681c13c" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-0681c13c&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:245,&quot;column&quot;:11}}">
            <input
              className="pop-input"
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={currentUser ? "写下你的留言..." : "登录后才能留言哦"}
              disabled={!currentUser}
              style={{ flex: 1 }}
             data-qoder-id="qel-pop-input-e44e0bd8" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-input-e44e0bd8&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;pop-input&quot;,&quot;loc&quot;:{&quot;line&quot;:246,&quot;column&quot;:13}}"/>
            <button
              type="button"
              className="pop-btn cyan"
              disabled={!currentUser}
              style={{ padding: '8px 16px', fontSize: '14px' }}
              onClick={() => fileInputRef.current?.click()}
             data-qoder-id="qel-pop-btn-3a388201" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-3a388201&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:255,&quot;column&quot;:13}}">
              📷
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
             data-qoder-id="qel-input-3f40b734" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-input-3f40b734&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;input&quot;,&quot;loc&quot;:{&quot;line&quot;:264,&quot;column&quot;:13}}"/>
            <button
              type="submit"
              className="pop-btn primary"
              disabled={!currentUser || (!text.trim() && !imagePreview)}
             data-qoder-id="qel-pop-btn-3438788f" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-3438788f&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/ChatBoard.jsx&quot;,&quot;componentName&quot;:&quot;ChatBoard&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:271,&quot;column&quot;:13}}">
              发送
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
