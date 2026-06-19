import { useState, useRef, useEffect, type RefObject } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks, allBooks, type Book } from "../../data/siteData";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import "./Header.css";

interface SearchFieldProps {
  query: string;
  setQuery: (value: string) => void;
  showResults: boolean;
  setShowResults: (value: boolean) => void;
  results: Book[];
  onSelect: (slug: string) => void;
  className?: string;
  inputId: string;
  fieldRef?: RefObject<HTMLDivElement | null>;
}

function SearchField({
  query,
  setQuery,
  showResults,
  setShowResults,
  results,
  onSelect,
  className = "",
  inputId,
  fieldRef,
}: SearchFieldProps) {
  return (
    <div className={`header__search ${className}`.trim()} ref={fieldRef}>
      <svg
        className="header__search-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" />
      </svg>
      <input
        id={inputId}
        type="search"
        className="header__search-input"
        placeholder="Search titles, authors..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
        aria-label="Search books"
        aria-expanded={showResults && query.length > 0}
        aria-controls={`${inputId}-results`}
      />
      {showResults && query.trim() && (
        <div
          id={`${inputId}-results`}
          className="header__search-results"
          role="listbox"
        >
          {results.length > 0 ? (
            results.slice(0, 5).map((book) => (
              <button
                key={book.id}
                type="button"
                className="header__search-result"
                role="option"
                onClick={() => onSelect(book.slug)}
              >
                <span className="header__search-result-title">{book.title}</span>
                <span className="header__search-result-author">{book.author}</span>
              </button>
            ))
          ) : (
            <p className="header__search-empty">No books found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { count } = useCart();
  const { openSignIn, isSignedIn, signOut, userName, switchToSignUp } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const headerSearchRef = useRef<HTMLDivElement>(null);
  const navSearchRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? allBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const insideSearch =
        headerSearchRef.current?.contains(target) ||
        navSearchRef.current?.contains(target);

      if (!insideSearch) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function handleSearchSelect(slug: string) {
    setQuery("");
    setShowResults(false);
    setMenuOpen(false);
    navigate(`/books/${slug}`);
  }

  const searchProps = {
    query,
    setQuery,
    showResults,
    setShowResults,
    results,
    onSelect: handleSearchSelect,
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label="Pages & Co. home">
          <span className="header__logo-icon" aria-hidden="true">
            P
          </span>
          <span className="header__logo-text">Pages & Co.</span>
        </Link>

        <nav
          className={`header__nav${menuOpen ? " header__nav--open" : ""}`}
          aria-label="Main navigation"
        >
          <SearchField
            {...searchProps}
            className="header__search--nav"
            inputId="nav-search"
            fieldRef={navSearchRef}
          />

          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="header__nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="header__nav-auth">
            {isSignedIn ? (
              <>
                {userName && (
                  <p className="header__nav-greeting">Hi, {userName.split(" ")[0]}</p>
                )}
                <button
                  type="button"
                  className="header__nav-auth-btn"
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="header__nav-auth-btn"
                  onClick={() => {
                    openSignIn();
                    setMenuOpen(false);
                  }}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className="header__nav-auth-btn header__nav-auth-btn--primary"
                  onClick={() => {
                    switchToSignUp();
                    setMenuOpen(false);
                  }}
                >
                  Create account
                </button>
              </>
            )}
          </div>
        </nav>

        <div className="header__actions">
          <SearchField
            {...searchProps}
            className="header__search--bar"
            inputId="header-search"
            fieldRef={headerSearchRef}
          />

          {isSignedIn && userName && (
            <span className="header__greeting">Hi, {userName.split(" ")[0]}</span>
          )}

          <button
            type="button"
            className="header__sign-in"
            onClick={isSignedIn ? signOut : openSignIn}
            aria-label={isSignedIn ? `Sign out ${userName}` : "Sign in"}
          >
            {isSignedIn ? "Sign out" : "Sign in"}
          </button>

          <Link to="/bag" className="header__bag" aria-label={`Shopping bag, ${count} items`}>
            Bag
            <span className="header__bag-count" aria-hidden="true">
              {count}
            </span>
          </Link>

          <button
            type="button"
            className="header__menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="header__menu-bar" />
            <span className="header__menu-bar" />
            <span className="header__menu-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
