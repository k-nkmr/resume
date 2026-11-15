(() => {
  const root = document.documentElement;
  const button = document.querySelector(".theme-toggle");

  if (!button) return;

  const updateButton = () => {
    const isDark = root.dataset.theme === "dark";
    button.textContent = isDark ? "☀ ライト" : "☾ ダーク";
    button.setAttribute("aria-pressed", String(isDark));
    button.title = isDark ? "ライトモードに切り替える" : "ダークモードに切り替える";
  };

  button.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("resume-theme", next);
    updateButton();
  });

  updateButton();
})();
