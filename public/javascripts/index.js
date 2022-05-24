const newMessageBtn = document.querySelector(".index-item.new-message-btn");

if (newMessageBtn) {
  const observer = new IntersectionObserver(
    ([e]) => {
      e.target.classList.toggle("is-pinned", e.intersectionRatio < 1);
      newMessageBtn.classList.remove("hidden-pseudo");
    },
    { threshold: [1], rootMargin: "-61px 0px -61px 0px" }
  );

  observer.observe(newMessageBtn);
}
