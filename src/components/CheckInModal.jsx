import React, { useState, useRef } from 'react';

export default function CheckInModal({ dateKey, existing, onClose, onComplete, ...qoderProps }) {
  const [preview, setPreview] = useState(existing?.image || null);
  const [note, setNote] = useState(existing?.note || '');
  const [isPublic, setIsPublic] = useState(existing?.isPublic ?? true);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      onComplete(dateKey, { image: preview, note, isPublic });
      setLoading(false);
    }, 300);
  };

  const formatDate = (key) => {
    const [y, m, d] = key.split('-');
    return `${y}年${m}月${d}日`;
  };

  return (
    <div className={["modal-overlay", qoderProps?.className].filter(Boolean).join(" ")} onClick={onClose} data-component="Check-in Modal" data-od-id="checkin-modal" style={qoderProps?.style} data-qoder-id={qoderProps?.["data-qoder-id"]} data-qoder-source={qoderProps?.["data-qoder-source"]}>
      <div className="modal-content" onClick={e => e.stopPropagation()} data-qoder-id="qel-modal-content-4efa8b43" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-content-4efa8b43&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;modal-content&quot;,&quot;loc&quot;:{&quot;line&quot;:39,&quot;column&quot;:7}}">
        <div className="modal-header" style={{ background: 'var(--pop-yellow)' }} data-qoder-id="qel-modal-header-ea149dd0" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-header-ea149dd0&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;modal-header&quot;,&quot;loc&quot;:{&quot;line&quot;:40,&quot;column&quot;:9}}">
          <h2 data-qoder-id="qel-h2-4bb2cbf3" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-h2-4bb2cbf3&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;h2&quot;,&quot;loc&quot;:{&quot;line&quot;:41,&quot;column&quot;:11}}">每日打卡 - {formatDate(dateKey)}</h2>
          <button className="modal-close" onClick={onClose} data-qoder-id="qel-modal-close-24a4bd7a" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-close-24a4bd7a&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;modal-close&quot;,&quot;loc&quot;:{&quot;line&quot;:42,&quot;column&quot;:11}}">×</button>
        </div>
        <div className="modal-body" data-qoder-id="qel-modal-body-89dcc30a" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-body-89dcc30a&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;modal-body&quot;,&quot;loc&quot;:{&quot;line&quot;:44,&quot;column&quot;:9}}">
          <div className="flex flex-col gap-md" data-qoder-id="qel-flex-c12d4bf6" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-c12d4bf6&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:45,&quot;column&quot;:11}}">
            <div data-qoder-id="qel-div-7bb0449b" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-7bb0449b&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:46,&quot;column&quot;:13}}">
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }} data-qoder-id="qel-label-40552b9c" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-label-40552b9c&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;label&quot;,&quot;loc&quot;:{&quot;line&quot;:47,&quot;column&quot;:15}}">
                上传今日学习图片 (可选)
              </label>
              <div
                className="pop-card"
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  minHeight: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '12px',
                  borderStyle: preview ? 'solid' : 'dashed'
                }}
                onClick={() => fileInputRef.current?.click()}
               data-qoder-id="qel-pop-card-842ec4f5" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-card-842ec4f5&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;pop-card&quot;,&quot;loc&quot;:{&quot;line&quot;:50,&quot;column&quot;:15}}">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: 220, border: '3px solid var(--pop-black)', boxShadow: 'var(--shadow-pop)' }}
                   data-qoder-id="qel-img-19c8623b" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-img-19c8623b&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;img&quot;,&quot;loc&quot;:{&quot;line&quot;:67,&quot;column&quot;:19}}"/>
                ) : (
                  <>
                    <div style={{ fontSize: '48px' }} data-qoder-id="qel-div-cd6569e6" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-cd6569e6&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:74,&quot;column&quot;:21}}">📷</div>
                    <p style={{ fontWeight: 700, color: 'var(--muted)' }} data-qoder-id="qel-p-e8ce9345" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-p-e8ce9345&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;p&quot;,&quot;loc&quot;:{&quot;line&quot;:75,&quot;column&quot;:21}}">点击上传图片</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                 data-qoder-id="qel-input-c46b8540" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-input-c46b8540&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;input&quot;,&quot;loc&quot;:{&quot;line&quot;:78,&quot;column&quot;:17}}"/>
              </div>
            </div>

            <div data-qoder-id="qel-div-d0656e9f" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-d0656e9f&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:88,&quot;column&quot;:13}}">
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }} data-qoder-id="qel-label-e0272b26" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-label-e0272b26&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;label&quot;,&quot;loc&quot;:{&quot;line&quot;:89,&quot;column&quot;:15}}">
                学习心得 (可选)
              </label>
              <textarea
                className="pop-input"
                rows={3}
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="今天学到了什么？"
                style={{ resize: 'vertical', fontFamily: 'var(--font-body)' }}
               data-qoder-id="qel-pop-input-93cc5993" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-input-93cc5993&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;pop-input&quot;,&quot;loc&quot;:{&quot;line&quot;:92,&quot;column&quot;:15}}"/>
            </div>

            <div className="flex items-center gap-sm" data-qoder-id="qel-flex-645395ac" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-645395ac&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:102,&quot;column&quot;:13}}">
              <button
                type="button"
                className={`pop-btn ${isPublic ? 'primary' : ''}`}
                style={{ padding: '8px 16px', fontSize: '14px' }}
                onClick={() => setIsPublic(true)}
               data-qoder-id="qel-button-01464663" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-button-01464663&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;button&quot;,&quot;loc&quot;:{&quot;line&quot;:103,&quot;column&quot;:15}}">
                公开
              </button>
              <button
                type="button"
                className={`pop-btn ${!isPublic ? 'primary' : ''}`}
                style={{ padding: '8px 16px', fontSize: '14px' }}
                onClick={() => setIsPublic(false)}
               data-qoder-id="qel-button-7a4dc0a3" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-button-7a4dc0a3&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;button&quot;,&quot;loc&quot;:{&quot;line&quot;:111,&quot;column&quot;:15}}">
                私密
              </button>
              <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }} data-qoder-id="qel-span-ef32a9dc" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-span-ef32a9dc&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;span&quot;,&quot;loc&quot;:{&quot;line&quot;:119,&quot;column&quot;:15}}">
                {isPublic ? '所有人可见，可评论' : '仅自己可见'}
              </span>
            </div>

            <div className="flex gap-md" style={{ justifyContent: 'flex-end' }} data-qoder-id="qel-flex-e05b14a5" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-e05b14a5&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:124,&quot;column&quot;:13}}">
              <button className="pop-btn" onClick={onClose} disabled={loading} data-qoder-id="qel-pop-btn-d4544da6" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-d4544da6&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:125,&quot;column&quot;:15}}">
                取消
              </button>
              <button className="pop-btn primary" onClick={handleSubmit} disabled={loading} data-qoder-id="qel-pop-btn-d754525f" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-btn-d754525f&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/CheckInModal.jsx&quot;,&quot;componentName&quot;:&quot;CheckInModal&quot;,&quot;elementRole&quot;:&quot;pop-btn&quot;,&quot;loc&quot;:{&quot;line&quot;:128,&quot;column&quot;:15}}">
                {loading ? '打卡中...' : '确认打卡'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
