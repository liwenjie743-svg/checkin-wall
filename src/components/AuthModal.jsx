import React, { useState } from 'react';
import { saveUser, findUser, userExists, setCurrentUser } from '../utils/storage.js';

export default function AuthModal({ onClose, onLogin, ...qoderProps }) {
  const [mode, setMode] = useState('login'); // login | register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('请输入用户名和密码');
      return;
    }
    if (username.trim().length < 3) {
      setError('用户名至少3个字符');
      return;
    }
    if (password.trim().length < 4) {
      setError('密码至少4个字符');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (mode === 'login') {
        const user = findUser(username.trim(), password.trim());
        if (!user) {
          setError('用户名或密码错误');
          setLoading(false);
          return;
        }
        setCurrentUser(user);
        onLogin(user);
      } else {
        if (userExists(username.trim())) {
          setError('用户名已存在');
          setLoading(false);
          return;
        }
        const newUser = { username: username.trim(), password: password.trim() };
        saveUser(newUser);
        setCurrentUser(newUser);
        onLogin(newUser);
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className={["modal-overlay", qoderProps?.className].filter(Boolean).join(" ")} onClick={onClose} data-component="Auth Modal" data-od-id="auth-modal" style={qoderProps?.style} data-qoder-id={qoderProps?.["data-qoder-id"]} data-qoder-source={qoderProps?.["data-qoder-source"]}>
      <div className="modal-content" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()} data-qoder-id="qel-modal-content-5f597d85" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-content-5f597d85&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;modal-content&quot;,&quot;loc&quot;:{&quot;line&quot;:57,&quot;column&quot;:7}}">
        <div className="modal-header" style={{ background: mode === 'login' ? 'var(--pop-blue)' : 'var(--pop-magenta)', color: 'var(--pop-white)' }} data-qoder-id="qel-modal-header-32536fd2" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-header-32536fd2&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;modal-header&quot;,&quot;loc&quot;:{&quot;line&quot;:58,&quot;column&quot;:9}}">
          <h2 data-qoder-id="qel-h2-300318d9" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-h2-300318d9&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;h2&quot;,&quot;loc&quot;:{&quot;line&quot;:59,&quot;column&quot;:11}}">{mode === 'login' ? '用户登录' : '注册账号'}</h2>
          <button className="modal-close" onClick={onClose} data-qoder-id="qel-modal-close-333d8668" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-close-333d8668&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;modal-close&quot;,&quot;loc&quot;:{&quot;line&quot;:60,&quot;column&quot;:11}}">×</button>
        </div>
        <div className="modal-body" data-qoder-id="qel-modal-body-d1201bf8" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-modal-body-d1201bf8&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;modal-body&quot;,&quot;loc&quot;:{&quot;line&quot;:62,&quot;column&quot;:9}}">
          <form onSubmit={handleSubmit} className="flex flex-col gap-md" data-qoder-id="qel-flex-b85a3e15" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-flex-b85a3e15&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;flex&quot;,&quot;loc&quot;:{&quot;line&quot;:63,&quot;column&quot;:11}}">
            <div data-qoder-id="qel-div-d96742b9" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-d96742b9&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:64,&quot;column&quot;:13}}">
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 6, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }} data-qoder-id="qel-label-887f1ff2" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-label-887f1ff2&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;label&quot;,&quot;loc&quot;:{&quot;line&quot;:65,&quot;column&quot;:15}}">
                用户名
              </label>
              <input
                className="pop-input"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="输入你的用户名"
                autoFocus
               data-qoder-id="qel-pop-input-fa5bf9b0" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-input-fa5bf9b0&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;pop-input&quot;,&quot;loc&quot;:{&quot;line&quot;:68,&quot;column&quot;:15}}"/>
            </div>
            <div data-qoder-id="qel-div-d19f181d" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-div-d19f181d&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;div&quot;,&quot;loc&quot;:{&quot;line&quot;:77,&quot;column&quot;:13}}">
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 6, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }} data-qoder-id="qel-label-303365a8" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-label-303365a8&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;label&quot;,&quot;loc&quot;:{&quot;line&quot;:78,&quot;column&quot;:15}}">
                密码
              </label>
              <input
                className="pop-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="输入密码"
               data-qoder-id="qel-pop-input-fd5bfe69" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-pop-input-fd5bfe69&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;pop-input&quot;,&quot;loc&quot;:{&quot;line&quot;:81,&quot;column&quot;:15}}"/>
            </div>

            {error && (
              <div className="comic-bubble" style={{ background: '#fee2e2', borderColor: 'var(--pop-black)' }} data-qoder-id="qel-comic-bubble-4a8d8a51" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-comic-bubble-4a8d8a51&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;comic-bubble&quot;,&quot;loc&quot;:{&quot;line&quot;:91,&quot;column&quot;:15}}">
                <p style={{ color: 'var(--danger)', fontWeight: 700, fontSize: 14 }} data-qoder-id="qel-p-bb8eda5d" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-p-bb8eda5d&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;p&quot;,&quot;loc&quot;:{&quot;line&quot;:92,&quot;column&quot;:17}}">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className={`pop-btn ${mode === 'login' ? 'accent' : 'primary'} w-full`}
              disabled={loading}
             data-qoder-id="qel-button-b5e819a0" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-button-b5e819a0&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;button&quot;,&quot;loc&quot;:{&quot;line&quot;:96,&quot;column&quot;:13}}">
              {loading ? '处理中...' : (mode === 'login' ? '登录' : '注册')}
            </button>
          </form>

          <div className="text-center mt-md" data-qoder-id="qel-text-center-e498505b" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-text-center-e498505b&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;text-center&quot;,&quot;loc&quot;:{&quot;line&quot;:105,&quot;column&quot;:11}}">
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--pop-blue)', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
             data-qoder-id="qel-button-c3e82faa" data-qoder-source="{&quot;qoderId&quot;:&quot;qel-button-c3e82faa&quot;,&quot;filePath&quot;:&quot;react-vite/src/components/AuthModal.jsx&quot;,&quot;componentName&quot;:&quot;AuthModal&quot;,&quot;elementRole&quot;:&quot;button&quot;,&quot;loc&quot;:{&quot;line&quot;:106,&quot;column&quot;:13}}">
              {mode === 'login' ? '还没有账号？去注册 →' : '已有账号？去登录 →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
