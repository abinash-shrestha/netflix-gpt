// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'netflixgpt-545fa.firebaseapp.com',
  projectId: 'netflixgpt-545fa',
  storageBucket: 'netflixgpt-545fa.firebasestorage.app',
  messagingSenderId: '66589198426',
  appId: '1:66589198426:web:d418b383c55e1e729e7063',
  measurementId: 'G-1QDS8CMJSE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get Auth
export const auth = getAuth();
