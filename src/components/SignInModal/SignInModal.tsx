import { useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useModalA11y } from "../../hooks/useModalA11y";
import "./SignInModal.css";

export default function SignInModal() {
  const { isSignInOpen, closeSignIn, signIn, switchToSignUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useModalA11y(isSignInOpen, closeSignIn);

  if (!isSignInOpen) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const success = signIn(email, password);
    if (!success) {
      setError("Please enter a valid email and password (min 6 characters).");
      return;
    }
    setError("");
  }

  return (
    <div className="sign-in-modal" role="dialog" aria-modal="true" aria-labelledby="sign-in-title">
      <button
        type="button"
        className="sign-in-modal__backdrop"
        aria-label="Close sign in"
        onClick={closeSignIn}
      />

      <div className="sign-in-modal__dialog">
        <button
          type="button"
          className="sign-in-modal__close"
          aria-label="Close"
          onClick={closeSignIn}
        >
          ×
        </button>

        <span className="sign-in-modal__logo" aria-hidden="true">
          P
        </span>

        <h2 id="sign-in-title" className="sign-in-modal__title">
          Welcome back
        </h2>
        <p className="sign-in-modal__subtitle">
          Sign in to access your bag, orders and wishlist
        </p>

        <form className="sign-in-modal__form" onSubmit={handleSubmit} noValidate>
          <div className="sign-in-modal__field">
            <label htmlFor="sign-in-email" className="sign-in-modal__label">
              Email
            </label>
            <input
              id="sign-in-email"
              type="email"
              className="sign-in-modal__input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="sign-in-modal__field">
            <label htmlFor="sign-in-password" className="sign-in-modal__label">
              Password
            </label>
            <input
              id="sign-in-password"
              type="password"
              className="sign-in-modal__input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          {error && (
            <p className="sign-in-modal__error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="sign-in-modal__submit">
            Sign in
          </button>
        </form>

        <p className="sign-in-modal__footer">
          New here?{" "}
          <button type="button" className="sign-in-modal__footer-link" onClick={switchToSignUp}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
