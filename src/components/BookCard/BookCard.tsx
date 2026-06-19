import { Link } from "react-router-dom";
import type { Book } from "../../data/siteData";
import { useCart } from "../../hooks/useCart";
import "./BookCard.css";

interface BookCardProps {
  book: Book;
  linkToDetail?: boolean;
}

function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function BookCard({ book, linkToDetail = false }: BookCardProps) {
  const { addItem } = useCart();

  const cover = (
    <div className="book-card__cover-wrap">
      <div
        className="book-card__cover"
        style={{ backgroundColor: book.coverColor }}
      >
        <h3 className="book-card__cover-title">{book.title}</h3>
        <p className="book-card__cover-author">{book.author}</p>
      </div>

      {book.badge && (
        <span
          className={`book-card__badge book-card__badge--${book.badge.toLowerCase()}`}
        >
          {book.badge}
        </span>
      )}

      <button
        type="button"
        className="book-card__add"
        aria-label={`Add ${book.title} to bag`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addItem(book.id);
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );

  const content = (
    <>
      {linkToDetail ? (
        <Link to={`/books/${book.slug}`} className="book-card__link">
          {cover}
        </Link>
      ) : (
        cover
      )}

      {linkToDetail ? (
        <Link to={`/books/${book.slug}`} className="book-card__text-link">
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">{book.author}</p>
        </Link>
      ) : (
        <>
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">{book.author}</p>
        </>
      )}

      <div className="book-card__meta">
        <div className="book-card__price-wrap">
          <span className="book-card__price">{formatPrice(book.price)}</span>
          {book.originalPrice && (
            <span className="book-card__price book-card__price--original">
              {formatPrice(book.originalPrice)}
            </span>
          )}
        </div>
        <span className="book-card__rating">
          <span className="book-card__star" aria-hidden="true">
            ★
          </span>
          {book.rating}
        </span>
      </div>
    </>
  );

  return <article className="book-card">{content}</article>;
}
