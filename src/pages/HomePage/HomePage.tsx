import HeroCarousel from "../../components/HeroCarousel/HeroCarousel";
import GenreGrid from "../../components/GenreGrid/GenreGrid";
import BookSection from "../../components/BookSection/BookSection";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import {
  featuredBooks,
  bestsellerBooks,
  newArrivalBooks,
} from "../../data/siteData";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <GenreGrid />
      <BookSection
        id="featured"
        label="EDITOR'S PICKS"
        title="Featured this month"
        books={featuredBooks}
        viewAllHref="/books"
      />
      <PromoBanner />
      <BookSection
        id="bestsellers"
        label="MOST LOVED"
        title="Bestsellers"
        books={bestsellerBooks}
        viewAllHref="/books"
      />
      <BookSection
        id="new-arrivals"
        label="HOT OFF THE PRESS"
        title="New arrivals"
        books={newArrivalBooks}
        viewAllHref="/books"
        columns={4}
      />
    </>
  );
}
