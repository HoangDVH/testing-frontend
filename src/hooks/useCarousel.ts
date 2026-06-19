import { useState, useEffect, useCallback } from "react";

export function useCarousel(totalSlides: number, autoPlayMs = 6000) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % totalSlides) + totalSlides) % totalSlides);
    },
    [totalSlides],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, autoPlayMs);
    return () => clearInterval(timer);
  }, [next, autoPlayMs]);

  return { current, goTo, next, prev };
}
