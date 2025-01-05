// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8tt4B7Fi0zSzm_6X9KWw_tcTPiQ0ddqw',
  authDomain: 'netflixgpt-545fa.firebaseapp.com',
  projectId: 'netflixgpt-545fa',
  storageBucket: 'netflixgpt-545fa.firebasestorage.app',
  messagingSenderId: '66589198426',
  appId: '1:66589198426:web:7f520e026f5c697d9e7063',
  measurementId: 'G-G884209Y6G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get Auth
export const auth = getAuth();
