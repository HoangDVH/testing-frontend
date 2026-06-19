import type { Book } from "../../data/siteData";
import SectionHeader from "../SectionHeader/SectionHeader";
import BookCard from "../BookCard/BookCard";
import "./BookSection.css";

interface BookSectionProps {
  id: string;
  label: string;
  title: string;
  books: Book[];
  viewAllHref?: string;
  columns?: 4 | 5;
}

export default function BookSection({
  id,
  label,
  title,
  books,
  viewAllHref,
  columns = 5,
}: BookSectionProps) {
  return (
    <section className="book-section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="container">
        <SectionHeader label={label} title={title} viewAllHref={viewAllHref} />
        <ul
          className={`book-section__grid${columns === 4 ? " book-section__grid--4" : ""}`}
        >
          {books.map((book) => (
            <li key={book.id}>
              <BookCard book={book} linkToDetail />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
