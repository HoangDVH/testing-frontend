import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { catalogBooks } from "../../data/siteData";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import "./BagPage.css";

function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function BagPage() {
  const { items, count, subtotal, removeItem, updateQuantity } = useCart();
  const { openSignIn, isSignedIn } = useAuth();
  const [checkoutItemCount, setCheckoutItemCount] = useState<number | null>(null);

  const checkoutMessage =
    checkoutItemCount !== null && checkoutItemCount === count && count > 0
      ? "Thanks! Your order has been placed (demo)."
      : null;

  const cartEntries = items
    .map((item) => {
      const book = catalogBooks.find((entry) => entry.id === item.bookId);
      if (!book) return null;
      return { ...item, book };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  function handleCheckout() {
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    setCheckoutItemCount(count);
  }

  return (
    <div className="bag-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Bag" },
          ]}
        />

        <h1 className="bag-page__title">Your bag</h1>

        {cartEntries.length > 0 ? (
          <div className="bag-page__layout">
            <ul className="bag-page__items">
              {cartEntries.map(({ book, quantity }) => (
                <li key={book.id}>
                  <article className="bag-item">
                    <div
                      className="bag-item__cover"
                      style={{ backgroundColor: book.coverColor }}
                      aria-hidden="true"
                    >
                      <span className="bag-item__cover-title">{book.title}</span>
                    </div>

                    <div className="bag-item__info">
                      <h2 className="bag-item__title">
                        <Link to={`/books/${book.slug}`}>{book.title}</Link>
                      </h2>
                      <p className="bag-item__author">{book.author}</p>
                      <button
                        type="button"
                        className="bag-item__remove"
                        onClick={() => removeItem(book.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="bag-item__actions">
                      <div className="bag-item__quantity">
                        <button
                          type="button"
                          className="bag-item__qty-btn"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(book.id, quantity - 1)}
                        >
                          −
                        </button>
                        <span className="bag-item__qty-value">{quantity}</span>
                        <button
                          type="button"
                          className="bag-item__qty-btn"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(book.id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="bag-item__price">
                        {formatPrice(book.price * quantity)}
                      </span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            <aside className="bag-summary" aria-label="Order summary">
              <h2 className="bag-summary__title">Order summary</h2>

              <div className="bag-summary__row">
                <span>Subtotal ({count} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="bag-summary__row">
                <span>Shipping</span>
                <span className="bag-summary__value--free">Free</span>
              </div>

              <div className="bag-summary__row bag-summary__row--total">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <button
                type="button"
                className="bag-summary__checkout"
                onClick={handleCheckout}
              >
                Checkout
              </button>

              {checkoutMessage && (
                <p className="bag-summary__success" role="status">
                  {checkoutMessage}
                </p>
              )}

              <p className="bag-summary__note">
                You'll be asked to sign in to complete your order.
              </p>
            </aside>
          </div>
        ) : (
          <div className="bag-page__empty">
            <h2 className="bag-page__empty-title">Your bag is empty</h2>
            <p className="bag-page__empty-text">
              Browse our collection and add a book you love.
            </p>
            <Link to="/books" className="bag-page__empty-link">
              Shop all books →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
