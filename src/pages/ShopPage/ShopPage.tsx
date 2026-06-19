import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import BookCard from "../../components/BookCard/BookCard";
import {
  catalogBooks,
  filterCategories,
  sortOptions,
  type Book,
  type FilterCategory,
} from "../../data/siteData";
import "./ShopPage.css";

function sortBooks(books: Book[], sortBy: string): Book[] {
  const sorted = [...books];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    default:
      return sorted;
  }
}

function getActiveCategory(genreParam: string | null): FilterCategory {
  if (genreParam && filterCategories.includes(genreParam as FilterCategory)) {
    return genreParam as FilterCategory;
  }
  return "All";
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = getActiveCategory(searchParams.get("genre"));
  const [sortBy, setSortBy] = useState("featured");

  const filteredBooks = useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? catalogBooks
        : catalogBooks.filter((book) => book.genre === activeCategory);

    return sortBooks(filtered, sortBy);
  }, [activeCategory, sortBy]);

  function handleCategoryChange(category: FilterCategory) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ genre: category });
    }
  }

  return (
    <div className="shop-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Books" },
          ]}
        />

        <header className="shop-page__header">
          <h1 className="shop-page__title">All books</h1>
          <p className="shop-page__count">
            {filteredBooks.length} titles in the collection
          </p>
        </header>

        <div className="shop-page__toolbar">
          <div className="shop-page__filters" role="group" aria-label="Filter by genre">
            {filterCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`shop-page__filter${activeCategory === category ? " shop-page__filter--active" : ""}`}
                aria-pressed={activeCategory === category}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="shop-page__sort">
            <label htmlFor="sort-select" className="shop-page__sort-label">
              Sort by
            </label>
            <select
              id="sort-select"
              className="shop-page__sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ul className="shop-page__grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <li key={book.id}>
                <BookCard book={book} linkToDetail />
              </li>
            ))
          ) : (
            <li className="shop-page__empty">No books match this filter.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
