import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            // io.unobserve(e.target); // Keep observing in case of layout shifts
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 100px 0px" } // Trigger early
    );

    const observeNewElements = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
        io.observe(el);
        
        // Failsafe: if the element is currently anywhere near or above the viewport bottom, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add("in");
        }
      });
    };

    observeNewElements();

    const mo = new MutationObserver(() => observeNewElements());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
