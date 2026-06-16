const STORAGE_KEYS = {
  USERS: 'popart_users',
  CHECKINS: 'popart_checkins',
  MESSAGES: 'popart_messages',
  CURRENT_USER: 'popart_current_user'
};

// ===== Users =====
export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
  } catch {
    return [];
  }
}

export function saveUser(user) {
  const users = getUsers();
  const existing = users.findIndex(u => u.username === user.username);
  if (existing >= 0) {
    users[existing] = { ...users[existing], ...user };
  } else {
    users.push({ ...user, id: Date.now().toString(36) });
  }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return user;
}

export function findUser(username, password) {
  const users = getUsers();
  return users.find(u => u.username === username && u.password === password);
}

export function userExists(username) {
  return getUsers().some(u => u.username === username);
}

// ===== Current Session =====
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

// ===== Check-ins =====
export function getCheckins() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKINS)) || {};
  } catch {
    return {};
  }
}

export function saveCheckin(dateKey, checkinData) {
  const checkins = getCheckins();
  checkins[dateKey] = checkinData;
  localStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify(checkins));
}

export function getCheckinForDate(dateKey) {
  return getCheckins()[dateKey] || null;
}

export function addCheckinComment(dateKey, comment) {
  const checkins = getCheckins();
  const checkin = checkins[dateKey];
  if (!checkin) return checkins;
  if (!checkin.comments) checkin.comments = [];
  checkin.comments.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    ...comment,
    timestamp: Date.now()
  });
  localStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify(checkins));
  return checkins;
}

// ===== Messages =====
export function getMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES)) || [];
  } catch {
    return [];
  }
}

export function addMessage(message) {
  const messages = getMessages();
  messages.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    ...message,
    timestamp: Date.now(),
    replies: []
  });
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  return messages;
}

export function addReply(messageId, reply) {
  const messages = getMessages();
  const msg = messages.find(m => m.id === messageId);
  if (!msg) return messages;
  if (!msg.replies) msg.replies = [];
  msg.replies.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    ...reply,
    timestamp: Date.now()
  });
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  return messages;
}

// ===== Encouragement quotes =====
export const ENCOURAGEMENTS = [
  "太棒了！今天的努力是明天的实力！",
  "坚持就是胜利，你正在变得更优秀！",
  "每一分钟的学习都在为未来铺路！",
  "Wow! 你的专注力简直无敌！",
  "学习达人就是你，继续保持！",
  "今天的汗水，明天的收获！",
  "你比昨天更强大了，继续冲！",
  "POW! 这一打卡，威力十足！",
  "优秀的人都在默默努力，你就是其中之一！",
  "打卡成功！离目标又近了一步！",
  "BAM! 学习力爆表！",
  "专注的时光最美，你做到了！"
];

export function getRandomEncouragement() {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}
