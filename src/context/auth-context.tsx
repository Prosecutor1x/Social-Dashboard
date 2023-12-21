import React, { useState, useEffect, useContext, createContext } from "react";

import FirebaseAuth, {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from "@firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase.config";
import Loader from "@/components/shared/loader";

export interface IAuthContext {
  authUser: FirebaseAuth.User | null;
  loginWithEmailPassword: (email: string, password: string) => any;
  signUpWithEmailPassword: (email: string, password: string) => any;
  signUpWithGoogle: () => any;
  signUpWithTwitter: () => any;
  signUpWithGithub: () => any;
  logout: () => any;
  phoneNumber: string;
  setPhoneNumber: (phonenumber: string) => void;
}

const defaultValues: IAuthContext = {
  authUser: null,
  phoneNumber: "",
  setPhoneNumber: () => {},
  loginWithEmailPassword: () => {},
  signUpWithEmailPassword: () => {},
  signUpWithGoogle: () => {},
  signUpWithTwitter: () => {},
  signUpWithGithub: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }: any) {
  const [phoneNumber, setPhoneNumber] = useState(defaultValues.phoneNumber);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<FirebaseAuth.User | null>(
    defaultValues.authUser,
  );
  const auth = getAuth();

  const handleUserAuth = async (result: any, provider: string) => {
    try {
      const user = result.user;
      if (user) {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (!userSnap.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          });
        }
        setAuthUser(user);
        return user;
      }
    } catch (error: any) {
      console.log(`Error signing up with ${provider}: ${error.message}`);
    }
  };

  const signUpWithGoogle = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    return handleUserAuth(result, "Google");
  };

  const signUpWithTwitter = async () => {
    const result = await signInWithPopup(auth, new TwitterAuthProvider());
    return handleUserAuth(result, "Twitter");
  };

  const signUpWithGithub = async () => {
    const result = await signInWithPopup(auth, new GithubAuthProvider());
    return handleUserAuth(result, "Github");
  };

  const signUpWithEmailPassword = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return handleUserAuth(result, "Email/Password");
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return handleUserAuth(result, "Email/Password");
  };

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const value: IAuthContext = {
    authUser,
    loginWithEmailPassword,
    signUpWithEmailPassword,
    signUpWithGoogle,
    signUpWithTwitter,
    signUpWithGithub,
    logout,
    phoneNumber,
    setPhoneNumber,
  };
  return (
    <>
      <AuthContext.Provider value={value}>
        {isLoading ? <Loader /> : children}
      </AuthContext.Provider>
    </>
  );
}
