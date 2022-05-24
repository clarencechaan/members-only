const fader = document.querySelector(".index-item.new-message-btn");
const observer = new IntersectionObserver(
  ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
  { threshold: [1], rootMargin: "-61px" }
);

observer.observe(fader);

console.log(fader);
