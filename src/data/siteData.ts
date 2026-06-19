export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  badge?: "BESTSELLER" | "NEW";
  coverColor: string;
  genre: string;
  description?: string;
  pages?: number;
  year?: number;
  format?: string;
  publisher?: string;
  language?: string;
  isbn?: string;
}

export interface Genre {
  id: string;
  name: string;
  count: number;
  gradient: string;
}

export interface HeroSlide {
  id: string;
  label: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
  gradient: string;
}

export const filterCategories = [
  "All",
  "Fiction",
  "Mystery",
  "Sci-Fi",
  "Non-fiction",
  "Poetry",
  "Children",
  "Biography",
  "Romance",
] as const;

export type FilterCategory = (typeof filterCategories)[number];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/books" },
  { label: "Fiction", href: "/books?genre=Fiction" },
  { label: "Mystery", href: "/books?genre=Mystery" },
  { label: "Children", href: "/books?genre=Children" },
  { label: "Poetry", href: "/books?genre=Poetry" },
];

export const catalogBooks: Book[] = [
  {
    id: "lighthouse-keeper",
    slug: "the-lighthouse-keeper",
    title: "The Lighthouse Keeper",
    author: "Mara Ellison",
    price: 18,
    originalPrice: 24,
    rating: 4.8,
    coverColor: "#3d5a47",
    genre: "Fiction",
    description:
      "On a remote island where the sea meets the sky, a solitary keeper tends a light that has guided sailors for generations. When a stranger arrives with secrets tied to the lighthouse's past, Mara must choose between the quiet life she knows and truths that could change everything.",
    pages: 212,
    year: 2023,
    format: "Hardcover",
    publisher: "Pages & Co. Press",
    language: "English",
    isbn: "978-1-945678-32-1",
  },
  {
    id: "overstory",
    slug: "the-overstory",
    title: "The Overstory",
    author: "Richard Powers",
    price: 18,
    rating: 4.5,
    badge: "BESTSELLER",
    coverColor: "#5c6b4a",
    genre: "Fiction",
    pages: 502,
    year: 2018,
    format: "Paperback",
    publisher: "W. W. Norton",
    language: "English",
    isbn: "978-0-393-35352-0",
  },
  {
    id: "circe",
    slug: "circe",
    title: "Circe",
    author: "Madeline Miller",
    price: 16,
    originalPrice: 22,
    rating: 4.5,
    badge: "NEW",
    coverColor: "#3d6b6b",
    genre: "Fiction",
    pages: 393,
    year: 2024,
    format: "Paperback",
    publisher: "Little, Brown",
    language: "English",
    isbn: "978-0-316-55584-1",
  },
  {
    id: "silent-patient",
    slug: "the-silent-patient",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 14,
    rating: 4.5,
    coverColor: "#6b4a6b",
    genre: "Mystery",
    pages: 336,
    year: 2019,
    format: "Paperback",
    publisher: "Celadon Books",
    language: "English",
    isbn: "978-1-250-30969-7",
  },
  {
    id: "atomic-habits",
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    price: 16,
    originalPrice: 22,
    rating: 4.5,
    coverColor: "#4a5a7a",
    genre: "Non-fiction",
    pages: 320,
    year: 2020,
    format: "Hardcover",
    publisher: "Avery",
    language: "English",
    isbn: "978-0-735-21129-2",
  },
  {
    id: "crawdads",
    slug: "where-the-crawdads-sing",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 18,
    rating: 4.5,
    coverColor: "#4a6b52",
    genre: "Fiction",
    pages: 384,
    year: 2018,
    format: "Paperback",
    publisher: "G. P. Putnam's Sons",
    language: "English",
    isbn: "978-0-735-21909-0",
  },
  {
    id: "midnight-library",
    slug: "the-midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 17,
    rating: 4.5,
    badge: "NEW",
    coverColor: "#2d4a6b",
    genre: "Fiction",
    pages: 304,
    year: 2024,
    format: "Hardcover",
    publisher: "Viking",
    language: "English",
    isbn: "978-0-525-55947-4",
  },
  {
    id: "educated",
    slug: "educated",
    title: "Educated",
    author: "Tara Westover",
    price: 20,
    rating: 4.5,
    badge: "NEW",
    coverColor: "#b8956a",
    genre: "Biography",
    pages: 334,
    year: 2023,
    format: "Hardcover",
    publisher: "Random House",
    language: "English",
    isbn: "978-0-399-59050-4",
  },
  {
    id: "evelyn-hugo",
    slug: "the-seven-husbands-of-evelyn-hugo",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 15,
    rating: 4.5,
    coverColor: "#7a4a6b",
    genre: "Romance",
    pages: 400,
    year: 2017,
    format: "Paperback",
    publisher: "Atria Books",
    language: "English",
    isbn: "978-1-501-16694-5",
  },
  {
    id: "project-hail-mary",
    slug: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 19,
    originalPrice: 24,
    rating: 4.5,
    badge: "BESTSELLER",
    coverColor: "#8b5a3c",
    genre: "Sci-Fi",
    pages: 496,
    year: 2021,
    format: "Hardcover",
    publisher: "Ballantine Books",
    language: "English",
    isbn: "978-0-593-13520-4",
  },
  {
    id: "borrowed-light",
    slug: "a-house-of-borrowed-light",
    title: "A House of Borrowed Light",
    author: "Clara Whitmore",
    price: 17.25,
    rating: 4.5,
    coverColor: "#6b4a7a",
    genre: "Romance",
    pages: 288,
    year: 2022,
    format: "Paperback",
    publisher: "Pages & Co. Press",
    language: "English",
    isbn: "978-1-945678-41-3",
  },
  {
    id: "river-took",
    slug: "everything-the-river-took",
    title: "Everything the River Took",
    author: "Jonah Pierce",
    price: 18.75,
    rating: 4.3,
    badge: "BESTSELLER",
    coverColor: "#7a5a3c",
    genre: "Fiction",
    pages: 356,
    year: 2021,
    format: "Hardcover",
    publisher: "Riverhead Books",
    language: "English",
    isbn: "978-0-525-55432-8",
  },
  {
    id: "milk-honey",
    slug: "milk-and-honey",
    title: "Milk and Honey",
    author: "Rupi Kaur",
    price: 12,
    rating: 4.2,
    coverColor: "#c4a882",
    genre: "Poetry",
    pages: 208,
    year: 2019,
    format: "Paperback",
    publisher: "Andrews McMeel",
    language: "English",
    isbn: "978-1-440-47733-8",
  },
  {
    id: "wild-robot",
    slug: "the-wild-robot",
    title: "The Wild Robot",
    author: "Peter Brown",
    price: 14,
    rating: 4.6,
    coverColor: "#4a7a6b",
    genre: "Children",
    pages: 288,
    year: 2020,
    format: "Hardcover",
    publisher: "Little, Brown",
    language: "English",
    isbn: "978-0-316-38199-4",
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return catalogBooks.find((book) => book.slug === slug);
}

export function getRelatedBooks(slug: string, limit = 2): Book[] {
  const relatedMap: Record<string, string[]> = {
    "the-lighthouse-keeper": [
      "a-house-of-borrowed-light",
      "everything-the-river-took",
    ],
  };

  const mapped = relatedMap[slug];
  if (mapped) {
    return mapped
      .map((relatedSlug) => getBookBySlug(relatedSlug))
      .filter((book): book is Book => Boolean(book));
  }

  const current = getBookBySlug(slug);
  if (!current) return catalogBooks.slice(0, limit);

  return catalogBooks
    .filter((book) => book.slug !== slug && book.genre === current.genre)
    .slice(0, limit);
}

export const allBooks = catalogBooks;

export const featuredBooks = catalogBooks.filter((b) =>
  ["overstory", "circe", "silent-patient", "atomic-habits", "crawdads"].includes(b.id),
);

export const bestsellerBooks = catalogBooks.filter((b) =>
  ["overstory", "circe", "silent-patient", "atomic-habits", "midnight-library"].includes(b.id),
);

export const newArrivalBooks = catalogBooks.filter((b) =>
  ["midnight-library", "educated", "evelyn-hugo", "project-hail-mary"].includes(b.id),
);

export const heroSlides: HeroSlide[] = [
  {
    id: "staff-favourites",
    label: "STAFF FAVOURITES",
    title: "The shelves we keep coming back to",
    description:
      "Our booksellers pick the titles they can't stop pressing into customers' hands.",
    cta: "Browse bestsellers",
    ctaHref: "/books",
    gradient: "linear-gradient(135deg, #2d4236 0%, #3d5a47 50%, #4a6b55 100%)",
  },
  {
    id: "new-arrivals",
    label: "HOT OFF THE PRESS",
    title: "Fresh voices, unforgettable stories",
    description:
      "Discover this week's arrivals — handpicked reads waiting for their first reader.",
    cta: "Shop new arrivals",
    ctaHref: "/books?genre=Fiction",
    gradient: "linear-gradient(135deg, #2a4a52 0%, #3d6670 50%, #4a7a85 100%)",
  },
  {
    id: "reading-room",
    label: "THE READING ROOM",
    title: "Your weekly dose of literary delight",
    description:
      "Join for 15% off your first order and a handpicked recommendation every week.",
    cta: "Join free",
    ctaHref: "/#newsletter",
    gradient: "linear-gradient(135deg, #4a2c35 0%, #6b3d4a 50%, #8b4d5c 100%)",
  },
];

export const genres: Genre[] = [
  { id: "fiction", name: "Fiction", count: 6, gradient: "linear-gradient(160deg, #8b5a3c 0%, #6b4430 100%)" },
  { id: "mystery", name: "Mystery", count: 1, gradient: "linear-gradient(160deg, #4a5a7a 0%, #3a4a65 100%)" },
  { id: "scifi", name: "Sci-Fi", count: 1, gradient: "linear-gradient(160deg, #3d6b6b 0%, #2d5555 100%)" },
  { id: "romance", name: "Romance", count: 2, gradient: "linear-gradient(160deg, #7a4a6b 0%, #5a3550 100%)" },
  { id: "children", name: "Children", count: 1, gradient: "linear-gradient(160deg, #b8956a 0%, #9a7a52 100%)" },
  { id: "poetry", name: "Poetry", count: 1, gradient: "linear-gradient(160deg, #8b7a9a 0%, #6b5a7a 100%)" },
];

export const footerLinks = {
  shop: ["New arrivals", "Bestsellers", "Fiction", "Children", "Gift cards"],
  about: ["Our story", "Events", "Visit the shop", "Journal"],
  help: ["Shipping", "Returns", "FAQ", "Contact"],
};
