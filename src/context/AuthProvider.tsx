import { useState, useCallback, type ReactNode } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const openSignIn = useCallback(() => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  }, []);
  const closeSignIn = useCallback(() => setIsSignInOpen(false), []);
  const openSignUp = useCallback(() => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  }, []);
  const closeSignUp = useCallback(() => setIsSignUpOpen(false), []);

  const switchToSignUp = useCallback(() => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  }, []);

  const switchToSignIn = useCallback(() => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const trimmedEmail = email.trim();
    const isValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) && password.length >= 6;

    if (!isValid) return false;

    setUserName(trimmedEmail.split("@")[0] || "Reader");
    setIsSignedIn(true);
    setIsSignInOpen(false);
    return true;
  }, []);

  const signUp = useCallback(
    (name: string, email: string, password: string, confirmPassword: string) => {
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const isValid =
        trimmedName.length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) &&
        password.length >= 6 &&
        password === confirmPassword;

      if (!isValid) return false;

      setUserName(trimmedName);
      setIsSignedIn(true);
      setIsSignUpOpen(false);
      return true;
    },
    [],
  );

  const signOut = useCallback(() => {
    setIsSignedIn(false);
    setUserName("");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSignInOpen,
        isSignUpOpen,
        isSignedIn,
        userName,
        openSignIn,
        closeSignIn,
        openSignUp,
        closeSignUp,
        switchToSignUp,
        switchToSignIn,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
