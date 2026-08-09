/* ===========================================================
   shopX — js/auth.js
   SIMULATED authentication for demo purposes only.

   IMPORTANT: This stores account info in plain text in the
   browser's localStorage. That is fine for a college/portfolio
   demo where nobody is entering a real password, but it is NOT
   how real authentication works — a real system hashes passwords
   server-side, never stores them in the browser, and never trusts
   the client to say "I'm logged in." Do not reuse this pattern
   for anything that handles real user data.
   =========================================================== */

const USERS_KEY = "shopX_users";
const SESSION_KEY = "shopX_session";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function currentUser() {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  return readUsers().find((u) => u.email === email) || null;
}

function signup({ name, email, mobile, password }) {
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "An account with this email already exists." };
  }
  users.push({ name, email, mobile, password }); // demo only — never store real passwords like this
  writeUsers(users);
  localStorage.setItem(SESSION_KEY, email);
  return { ok: true };
}

function login({ email, password }) {
  const user = readUsers().find((u) => u.email === email && u.password === password);
  if (!user) return { ok: false, error: "Incorrect email or password." };
  localStorage.setItem(SESSION_KEY, email);
  return { ok: true };
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}
