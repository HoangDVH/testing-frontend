import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="container not-found__inner">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__text">
          We couldn&apos;t find that page. Try browsing our collection instead.
        </p>
        <Link to="/" className="not-found__link">
          Back to home
        </Link>
        <Link to="/books" className="not-found__link not-found__link--secondary">
          Shop all books
        </Link>
      </div>
    </div>
  );
}
