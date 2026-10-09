(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("ls-wiki-theme");
  const theme = stored || "dark";
  root.setAttribute("data-theme", theme);

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    localStorage.setItem("ls-wiki-theme", next);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute(
        "aria-label",
        next === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  setTheme(theme);

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  });

  document.querySelectorAll(".nav-group-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.parentElement.classList.toggle("is-collapsed");
    });
  });

  document.querySelectorAll(".nav-group").forEach(function (group) {
    if (group.querySelector("a.is-active")) {
      group.classList.remove("is-collapsed");
    }
  });

  const toc = document.querySelector("[data-page-toc]");
  if (toc) {
    const headings = document.querySelectorAll(".wiki-main h2[id]");
    const list = document.createElement("ul");
    headings.forEach(function (h) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });
    toc.appendChild(list);
  }
})();
