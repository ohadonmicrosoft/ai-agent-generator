import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD-FKOVrc22alATy1LzgouWG6KLW2V2YWs",
  authDomain: "ai-agent-generator-a05b0.firebaseapp.com",
  projectId: "ai-agent-generator-a05b0",
  storageBucket: "ai-agent-generator-a05b0.firebasestorage.app",
  messagingSenderId: "408498574443",
  appId: "1:408498574443:web:4017ca6bb7f13c900bcd2e",
  measurementId: "G-BLGHNQCDX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Analytics conditionally (only in browser)
export const analytics = typeof window !== 'undefined' 
  ? isSupported().then(yes => yes ? getAnalytics(app) : null) 
  : null;

export default app; 