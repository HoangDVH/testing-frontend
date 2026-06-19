import { useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useModalA11y } from "../../hooks/useModalA11y";
import "../SignInModal/SignInModal.css";

export default function SignUpModal() {
  const { isSignUpOpen, closeSignUp, signUp, switchToSignIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useModalA11y(isSignUpOpen, closeSignUp);

  if (!isSignUpOpen) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const success = signUp(name, email, password, confirmPassword);
    if (!success) {
      setError(
        "Please fill in all fields. Name (min 2 chars), valid email, password (min 6 chars).",
      );
      return;
    }

    setError("");
  }

  return (
    <div className="sign-in-modal" role="dialog" aria-modal="true" aria-labelledby="sign-up-title">
      <button
        type="button"
        className="sign-in-modal__backdrop"
        aria-label="Close create account"
        onClick={closeSignUp}
      />

      <div className="sign-in-modal__dialog sign-in-modal__dialog--tall">
        <button
          type="button"
          className="sign-in-modal__close"
          aria-label="Close"
          onClick={closeSignUp}
        >
          ×
        </button>

        <span className="sign-in-modal__logo" aria-hidden="true">
          P
        </span>

        <h2 id="sign-up-title" className="sign-in-modal__title">
          Join Pages & Co.
        </h2>
        <p className="sign-in-modal__subtitle">
          Create an account to save your bag, track orders and build your wishlist
        </p>

        <form className="sign-in-modal__form" onSubmit={handleSubmit} noValidate>
          <div className="sign-in-modal__field">
            <label htmlFor="sign-up-name" className="sign-in-modal__label">
              Full name
            </label>
            <input
              id="sign-up-name"
              type="text"
              className="sign-in-modal__input"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              autoComplete="name"
              required
            />
          </div>

          <div className="sign-in-modal__field">
            <label htmlFor="sign-up-email" className="sign-in-modal__label">
              Email
            </label>
            <input
              id="sign-up-email"
              type="email"
              className="sign-in-modal__input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              autoComplete="email"
              required
            />
          </div>

          <div className="sign-in-modal__field">
            <label htmlFor="sign-up-password" className="sign-in-modal__label">
              Password
            </label>
            <input
              id="sign-up-password"
              type="password"
              className="sign-in-modal__input"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="sign-in-modal__field">
            <label htmlFor="sign-up-confirm" className="sign-in-modal__label">
              Confirm password
            </label>
            <input
              id="sign-up-confirm"
              type="password"
              className="sign-in-modal__input"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p className="sign-in-modal__error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="sign-in-modal__submit">
            Create account
          </button>
        </form>

        <p className="sign-in-modal__footer">
          Already have an account?{" "}
          <button type="button" className="sign-in-modal__footer-link" onClick={switchToSignIn}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
