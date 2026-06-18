const fs = require('fs');
const css = `
/* ─── AUTHENTICATION & LOGIN PAGE ─────────────────────────────── */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

.login-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(20px);
  box-shadow: var(--card-shadow);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.login-header {
  text-align: center;
}

.login-logo {
  height: 48px;
  margin-bottom: 16px;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 0.9rem;
  color: var(--text2);
}

.login-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #EF4444;
  padding: 12px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  text-align: center;
}

/* ─── ADMIN USERS DASHBOARD ───────────────────────────────────── */
.users-table-container {
  width: 100%;
  overflow-x: auto;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  margin-top: 24px;
  background: var(--card-bg);
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.users-table th {
  background: var(--bg3);
  color: var(--text2);
  padding: 12px 16px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
}

.users-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  font-size: 0.9rem;
}

.users-table tr:last-child td {
  border-bottom: none;
}

.users-table tr:hover {
  background: rgba(255, 255, 255, 0.02);
}
[data-theme="light"] .users-table tr:hover {
  background: rgba(0, 0, 0, 0.02);
}
`;
fs.appendFileSync('index.css', css);
console.log('Appended styles to index.css');
