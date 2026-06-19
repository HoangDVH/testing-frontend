import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { footerLinks } from "../../data/siteData";
import "./Footer.css";

const footerRouteMap: Record<string, Record<string, string>> = {
  shop: {
    "New arrivals": "/#new-arrivals",
    Bestsellers: "/books",
    Fiction: "/books?genre=Fiction",
    Children: "/books?genre=Children",
    "Gift cards": "/books",
  },
  about: {
    "Our story": "/",
    Events: "/",
    "Visit the shop": "/",
    Journal: "/",
  },
  help: {
    Shipping: "/",
    Returns: "/",
    FAQ: "/",
    Contact: "/#newsletter",
  },
};

function FooterNavLink({
  section,
  label,
}: {
  section: keyof typeof footerRouteMap;
  label: string;
}) {
  const href = footerRouteMap[section][label] ?? "/";

  if (href.startsWith("/")) {
    return (
      <Link to={href} className="footer__link">
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className="footer__link">
      {label}
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!isValid) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setMessage({ type: "success", text: "Welcome to The Reading Room!" });
    setEmail("");
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__brand-icon" aria-hidden="true">
              P
            </span>
            <p className="footer__brand-name">Pages & Co.</p>
            <p className="footer__brand-text">
              An independent bookstore bringing stories to life since 2010.
              Visit us in person or browse online anytime.
            </p>
            <div className="footer__social" aria-label="Social media">
              <a href="#linkedin" className="footer__social-link" aria-label="LinkedIn">
                in
              </a>
              <a href="#twitter" className="footer__social-link" aria-label="X">
                X
              </a>
              <a href="#facebook" className="footer__social-link" aria-label="Facebook">
                f
              </a>
            </div>
          </div>

          <nav aria-label="Shop links">
            <h3 className="footer__heading">Shop</h3>
            <ul className="footer__links">
              {footerLinks.shop.map((link) => (
                <li key={link}>
                  <FooterNavLink section="shop" label={link} />
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="About links">
            <h3 className="footer__heading">About</h3>
            <ul className="footer__links">
              {footerLinks.about.map((link) => (
                <li key={link}>
                  <FooterNavLink section="about" label={link} />
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Help links">
            <h3 className="footer__heading">Help</h3>
            <ul className="footer__links">
              {footerLinks.help.map((link) => (
                <li key={link}>
                  <FooterNavLink section="help" label={link} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__newsletter" id="newsletter">
            <h3 className="footer__heading">The Reading Room</h3>
            <p className="footer__newsletter-text">
              One handpicked recommendation in your inbox each week
            </p>
            <form className="footer__form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                className="footer__input"
                placeholder="Your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage(null);
                }}
                required
              />
              <button type="submit" className="footer__submit">
                Join
              </button>
            </form>
            {message && (
              <p
                className={`footer__message footer__message--${message.type}`}
                role="status"
              >
                {message.text}
              </p>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <span>© 2026 Pages & Co.</span>
            <span aria-hidden="true">•</span>
            <a href="#privacy" className="footer__legal-link">
              Privacy
            </a>
            <span aria-hidden="true">•</span>
            <a href="#terms" className="footer__legal-link">
              Terms
            </a>
          </div>
          <p>Free shipping on orders over $50</p>
        </div>
      </div>
    </footer>
  );
}
