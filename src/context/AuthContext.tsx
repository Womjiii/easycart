import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; message?: string }>;
  register: (data: { name: string; email: string; password: string; phone?: string; address?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, fetch additional user data from Firestore
        try {
          const userDoc = await fetchUserFromFirestore(firebaseUser.uid);
          if (userDoc) {
            setUser(userDoc);
          } else {
            // If no user document exists, create one with basic info
            const newUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              phone: '',
              address: '',
              role: 'customer',
              created_at: new Date().toISOString()
            };
            // Try to save but don't fail if Firestore is blocked
            try {
              await saveUserToFirestore(newUser);
            } catch (e) {
              console.log('Could not save user to Firestore, using basic profile');
            }
            setUser(newUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Still set user with basic info from Firebase Auth
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email || '',
            phone: '',
            address: '',
            role: 'customer',
            created_at: new Date().toISOString()
          });
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const fetchUserFromFirestore = async (uid: string) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return { id: uid, ...userDoc.data() } as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user from Firestore:', error);
      return null;
    }
  };

  const saveUserToFirestore = async (userData: User) => {
    try {
      console.log('Saving user to Firestore:', userData);
      const userRef = doc(db, 'users', String(userData.id));
      await setDoc(userRef, userData);
      console.log('User saved to Firestore successfully');
    } catch (error: any) {
      console.error('Error saving user to Firestore:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }
  };

  const login = async (email: string, password: string, remember?: boolean): Promise<{ success: boolean; message?: string }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Fetch user data from Firestore
      let userData = await fetchUserFromFirestore(userCredential.user.uid);
      
      // If no user data in Firestore, create a basic profile
      if (!userData) {
        const newUser: User = {
          id: userCredential.user.uid,
          name: userCredential.user.displayName || 'User',
          email: userCredential.user.email || email,
          phone: '',
          address: '',
          role: 'customer',
          created_at: new Date().toISOString()
        };
        try {
          await saveUserToFirestore(newUser);
        } catch (e) {
          // Ignore save error during login - user can still login
          console.log('Could not save user to Firestore, using basic profile');
        }
        userData = newUser;
      }
      
      setUser(userData);
      
      return { success: true };
    } catch (error: any) {
      let message = 'Login failed';
      if (error.code === 'auth/user-not-found') {
        message = 'User not found';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Invalid password';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email format';
      } else if (error.code === 'auth/user-disabled') {
        message = 'This account has been disabled';
      }
      
      return { 
        success: false, 
        message 
      };
    }
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string; address?: string }): Promise<{ success: boolean; message?: string }> => {
    let firebaseUser = null;
    
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      firebaseUser = userCredential.user;
      
      // Update user profile with display name
      await updateProfile(firebaseUser, {
        displayName: data.name
      });

      // Create user data object
      const newUser: User = {
        id: firebaseUser.uid,
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        address: data.address || '',
        role: 'customer',
        created_at: new Date().toISOString()
      };

      // Try to save user data to Firestore
      // If this fails, user can still login (Firebase Auth works)
      try {
        await saveUserToFirestore(newUser);
      } catch (firestoreError) {
        console.log('Warning: Could not save user to Firestore. User can still login.');
      }
      
      setUser(newUser);
      
      return { success: true };
    } catch (error: any) {
      // If Firebase Auth creation failed, propagate the error
      let message = 'Registration failed';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already in use';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email format';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak (minimum 6 characters)';
      }
      
      return { 
        success: false, 
        message 
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
