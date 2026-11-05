// firebase-config.js - FIX SESSION LOGIN PERSIST (ewallet + profil + admin tidak saling timpa)
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// GANTI DENGAN CONFIG FIREBASE KAMU YANG ASLI DARI CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "toko-siap-antar.firebaseapp.com",
  projectId: "toko-siap-antar",
  storageBucket: "toko-siap-antar.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// Init sekali saja, jangan re-init di tiap halaman
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// PENTING: Session persist LOCAL biar tidak hilang saat pindah halaman ewallet <-> profil <-> admin
setPersistence(auth, browserLocalPersistence).catch(e=>console.warn("persist error", e));

// Debug session
onAuthStateChanged(auth, user=>{
  if(user){
    console.log("[SESSION] Login tetap:", user.uid, user.email);
    localStorage.setItem('last_uid', user.uid);
    localStorage.setItem('last_email', user.email||'');
  } else {
    console.log("[SESSION] Tidak login / logout");
  }
});

export { app, auth, db };
