import { Link } from "react-router-dom";
import "./PromoBanner.css";

export default function PromoBanner() {
  return (
    <section className="promo" aria-label="Membership promotion">
      <div className="container">
        <article className="promo__banner">
          <div>
            <p className="promo__label">THE READING ROOM</p>
            <h2 className="promo__title">
              Free shipping on every order over $35
            </h2>
            <p className="promo__description">
              Plus 15% off your first month and a weekly recommendation picked
              just for you.
            </p>
          </div>
          <Link to="/#newsletter" className="promo__cta">
            Join free
          </Link>
        </article>
      </div>
    </section>
  );
}
