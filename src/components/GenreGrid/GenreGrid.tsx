import { Link } from "react-router-dom";
import { genres } from "../../data/siteData";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./GenreGrid.css";

export default function GenreGrid() {
  return (
    <section className="genres" id="genres" aria-labelledby="genres-heading">
      <div className="container">
        <SectionHeader label="FIND YOUR SHELF" title="Browse by genre" />
        <ul className="genres__grid">
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link
                to={`/books?genre=${encodeURIComponent(genre.name)}`}
                className="genre-card"
                style={{ background: genre.gradient }}
                aria-label={`Browse ${genre.name}, ${genre.count} titles`}
              >
                <span className="genre-card__name">{genre.name}</span>
                <span className="genre-card__count">
                  {genre.count} {genre.count === 1 ? "title" : "titles"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
