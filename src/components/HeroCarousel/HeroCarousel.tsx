import { Link } from "react-router-dom";
import { heroSlides } from "../../data/siteData";
import { useCarousel } from "../../hooks/useCarousel";
import "./HeroCarousel.css";

export default function HeroCarousel() {
  const { current, goTo, next, prev } = useCarousel(heroSlides.length);

  return (
    <section className="hero" id="home" aria-label="Featured promotions">
      <div className="container">
        <div className="hero__slider">
          {heroSlides.map((slide, index) => (
            <article
              key={slide.id}
              className={`hero__slide${index === current ? " hero__slide--active" : ""}`}
              style={{ background: slide.gradient }}
              aria-hidden={index !== current}
            >
              <div className="hero__content">
                <p className="hero__label">{slide.label}</p>
                {index === current ? (
                  <h1 className="hero__title">{slide.title}</h1>
                ) : (
                  <p className="hero__title">{slide.title}</p>
                )}
                <p className="hero__description">{slide.description}</p>
                <Link to={slide.ctaHref} className="hero__cta">
                  {slide.cta}
                </Link>
              </div>
            </article>
          ))}

          <button
            type="button"
            className="hero__arrow hero__arrow--prev"
            aria-label="Previous slide"
            onClick={prev}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            className="hero__arrow hero__arrow--next"
            aria-label="Next slide"
            onClick={next}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="hero__dots" role="tablist" aria-label="Slide navigation">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`hero__dot${index === current ? " hero__dot--active" : ""}`}
                role="tab"
                aria-selected={index === current}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
