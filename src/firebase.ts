import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDyBUfNamESmR2IiHYQiffjfquC7S0UMi0',
  authDomain: 'easycart-f9645.firebaseapp.com',
  projectId: 'easycart-f9645',
  storageBucket: 'easycart-f9645.firebasestorage.app',
  messagingSenderId: '307356105656',
  appId: '1:307356105656:web:f24fa9fd6c4eb44375ed4d',
  measurementId: 'G-RQTH2ZK7RQ'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Analytics (only in browser environments)
let analyticsInstance: ReturnType<typeof getAnalytics> | null = null;
try {
  if (typeof window !== 'undefined') {
    analyticsInstance = getAnalytics(firebaseApp);
  }
} catch (e) {
  analyticsInstance = null;
}

export const analytics = analyticsInstance;
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;
