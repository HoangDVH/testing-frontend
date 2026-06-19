import { createContext } from "react";

export interface AuthContextValue {
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  isSignedIn: boolean;
  userName: string;
  openSignIn: () => void;
  closeSignIn: () => void;
  openSignUp: () => void;
  closeSignUp: () => void;
  switchToSignUp: () => void;
  switchToSignIn: () => void;
  signIn: (email: string, password: string) => boolean;
  signUp: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => boolean;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
