import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import BookCard from "../../components/BookCard/BookCard";
import { useCart } from "../../hooks/useCart";
import { getBookBySlug, getRelatedBooks } from "../../data/siteData";
import "./ProductDetailPage.css";

function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);

  const book = slug ? getBookBySlug(slug) : undefined;
  const relatedBooks = slug ? getRelatedBooks(slug) : [];

  if (!book) {
    return (
      <div className="product-page">
        <div className="container product-page__not-found">
          <h1>Book not found</h1>
          <p>
            <Link to="/books">Back to all books</Link>
          </p>
        </div>
      </div>
    );
  }

  const metaItems = [
    { label: "Format", value: book.format },
    { label: "Pages", value: book.pages?.toString() },
    { label: "Published", value: book.year?.toString() },
    { label: "Publisher", value: book.publisher },
    { label: "Language", value: book.language },
    { label: "ISBN", value: book.isbn },
  ].filter((item) => item.value);

  return (
    <div className="product-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Books", to: "/books" },
            { label: book.title },
          ]}
        />

        <article className="product-page__layout">
          <div
            className="product-page__cover"
            style={{ backgroundColor: book.coverColor }}
          >
            <p className="product-page__cover-title">{book.title}</p>
            <p className="product-page__cover-author">{book.author}</p>
          </div>

          <div className="product-page__info">
            <span className="product-page__genre">{book.genre}</span>
            <h1 className="product-page__title">{book.title}</h1>
            <p className="product-page__author">by {book.author}</p>

            <div className="product-page__stats">
              <span className="product-page__rating">
                <span className="product-page__star" aria-hidden="true">
                  ★
                </span>
                {book.rating}
              </span>
              {book.pages && <span>{book.pages} pages</span>}
              {book.year && <span>{book.year}</span>}
            </div>

            <div className="product-page__price-wrap">
              <span className="product-page__price">{formatPrice(book.price)}</span>
              {book.originalPrice && (
                <span className="product-page__price product-page__price--original">
                  {formatPrice(book.originalPrice)}
                </span>
              )}
            </div>

            {book.description && (
              <p className="product-page__description">{book.description}</p>
            )}

            <div className="product-page__actions">
              <button
                type="button"
                className="product-page__add-btn"
                onClick={() => addItem(book.id)}
              >
                Add to bag — {formatPrice(book.price)}
              </button>
              <button
                type="button"
                className={`product-page__wishlist-btn${wishlisted ? " product-page__wishlist-btn--active" : ""}`}
                aria-pressed={wishlisted}
                onClick={() => setWishlisted((prev) => !prev)}
              >
                <svg viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Wishlist
              </button>
            </div>

            <dl className="product-page__meta">
              {metaItems.map((item) => (
                <div key={item.label} className="product-page__meta-item">
                  <dt className="product-page__meta-label">{item.label}</dt>
                  <dd className="product-page__meta-value">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>

        {relatedBooks.length > 0 && (
          <section className="product-page__related" aria-labelledby="related-heading">
            <h2 id="related-heading" className="product-page__related-title">
              You may also like
            </h2>
            <ul className="product-page__related-grid">
              {relatedBooks.map((related) => (
                <li key={related.id}>
                  <BookCard book={related} linkToDetail />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
