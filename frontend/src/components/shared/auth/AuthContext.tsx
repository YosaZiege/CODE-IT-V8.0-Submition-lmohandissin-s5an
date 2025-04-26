// AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
   getAuth,
   User,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   GoogleAuthProvider,
   signOut
} from "firebase/auth";
import app from "../../../../firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext<{
   user: User | null;
   loading: boolean;
   signInWithEmail: (email: string, password: string) => Promise<void>;
   signInWithGoogle: () => Promise<void>;
   logOut: () => Promise<void>;
}>({
   user: null,
   loading: true,
   signInWithEmail: async () => { },
   signInWithGoogle: async () => { },
   logOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user);
         setLoading(false);
      });

      return () => unsubscribe();
   }, []);

   const signInWithEmail = async (email: string, password: string) => {
      try {
         await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
         console.error("Error signing in with email:", error);
         throw error;
      }
   };

   const signInWithGoogle = async () => {
      try {
         await signInWithPopup(auth, googleProvider);
      } catch (error) {
         console.error("Error signing in with Google:", error);
         throw error;
      }
   };

   const logOut = async () => {
      try {
         await signOut(auth);
      } catch (error) {
         console.error("Error signing out:", error);
         throw error;
      }
   };

   return (
      <AuthContext.Provider value={{ user, loading, signInWithEmail, signInWithGoogle, logOut }}>
         {children}
      </AuthContext.Provider>
   );
}

export const useAuth = () => useContext(AuthContext);
