'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD-FKOVrc22alATy1LzgouWG6KLW2V2YWs",
  authDomain: "ai-agent-generator-a05b0.firebaseapp.com",
  projectId: "ai-agent-generator-a05b0",
  storageBucket: "ai-agent-generator-a05b0.firebasestorage.app",
  messagingSenderId: "408498574443",
  appId: "1:408498574443:web:4017ca6bb7f13c900bcd2e",
  measurementId: "G-BLGHNQCDX7"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Analytics only in production and browser environment
let analytics: Analytics | null = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, storage, analytics }; 