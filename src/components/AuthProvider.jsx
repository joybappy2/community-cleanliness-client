import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // CREATE USER WITH EP
  const createUser = (email, password) => {
    setLoadingUser(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // GOOGLE LOGIN
  const googleLogin = () => {
    setLoadingUser(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Login with Email and Password
  const loginUser = (email, password) => {
    setLoadingUser(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // SIGNOUT USER
  const signOutUser = () => {
    setLoadingUser(true);
    return signOut(auth);
  };

  // GETTING CURRENT USER INFO
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curremtUser) => {
      setLoadingUser(true);
      setUser(curremtUser);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    googleLogin,
    loginUser,
    user,
    signOutUser,
    loadingUser,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
