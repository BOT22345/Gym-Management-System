// firebase.js
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBDD4npUEqQQ1N8GVhP2lGqnOt6ljIA0CA",
    authDomain: "gym-management-system-3b87d.firebaseapp.com",
    projectId: "gym-management-system-3b87d",
    storageBucket: "gym-management-system-3b87d.firebasestorage.app",
    messagingSenderId: "795663954516",
    appId: "1:795663954516:web:0fa2eabb68c7c689a033c1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Pass app here!
const storage = getStorage(app);

// AUTH FUNCTIONS
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// STORAGE UPLOAD
export function upload(file) {
  if (!file) return;

  const fileRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(fileRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log(progress);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) =>
        console.log("File available at", url)
      );
    }
  );

  alert("Picture Uploaded");
}

// ✅ Export auth for App.js
export { auth };
