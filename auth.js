/* ===========================================================
   shopX — js/auth.js
   Firebase Authentication
=========================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ===========================================================
// FIREBASE CONFIG
// ===========================================================

const firebaseConfig = {
  apiKey: "AIzaSyBUAJAWIAjU16NdSmX50YgiElXSl_EMqqY",
  authDomain: "shopx-de469.firebaseapp.com",
  projectId: "shopx-de469",
  storageBucket: "shopx-de469.firebasestorage.app",
  messagingSenderId: "327954449866",
  appId: "1:327954449866:web:268c6daec7e054102ffb33",
  measurementId: "G-C6PZ40FVR2"
};


// ===========================================================
// INITIALIZE FIREBASE
// ===========================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


// ===========================================================
// CURRENT USER
// ===========================================================

let user = null;

onAuthStateChanged(auth, (firebaseUser) => {
  user = firebaseUser;

  // Let the rest of the website know authentication changed
  window.dispatchEvent(
    new CustomEvent("shopx-auth-change", {
      detail: firebaseUser
    })
  );
});


// ===========================================================
// GOOGLE LOGIN
// ===========================================================

async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const firebaseUser = result.user;

    console.log("Google login successful");

    console.log({
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photo: firebaseUser.photoURL
    });

    return {
      ok: true,
      user: firebaseUser
    };

  } catch (error) {

    console.error("Google login failed:", error);

    return {
      ok: false,
      error: getAuthError(error)
    };
  }
}


// ===========================================================
// LOGOUT
// ===========================================================

async function logout() {
  try {

    await signOut(auth);

    return {
      ok: true
    };

  } catch (error) {

    console.error("Logout failed:", error);

    return {
      ok: false,
      error: error.message
    };
  }
}


// ===========================================================
// GET CURRENT USER
// ===========================================================

function currentUser() {
  return auth.currentUser;
}


// ===========================================================
// AUTH ERROR HANDLING
// ===========================================================

function getAuthError(error) {

  switch (error.code) {

    case "auth/popup-closed-by-user":
      return "Login window was closed.";

    case "auth/popup-blocked":
      return "Your browser blocked the Google login popup.";

    case "auth/cancelled-popup-request":
      return "Another login window is already open.";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    default:
      return error.message || "Google login failed.";
  }
}
import {
  loginWithGoogle,
  logout,
  currentUser
  
} from "./auth.js";


const accountBtn = document.getElementById("account-btn");

accountBtn.addEventListener("click", async () => {

  const user = currentUser();

  // Already logged in
  if (user) {

    const result = await logout();

    if (!result.ok) {
      alert(result.error);
    }

    return;
  }


  // Not logged in → Google login
  const result = await loginWithGoogle();

  if (!result.ok) {
    alert(result.error);
    return;
  }

  console.log("Logged in as:", result.user.displayName);
});

// ===========================================================
// EXPORT
// ===========================================================

export {
  auth,
  loginWithGoogle,
  logout,
  currentUser
};