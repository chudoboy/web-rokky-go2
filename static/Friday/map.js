const svg = document.getElementById("map");

// Находим все тёмные точки
const allPaths = Array.from(svg.querySelectorAll("path")).filter(p =>
  p.getAttribute("fill")?.toLowerCase() === "#2a2a2a"
);

// Активировать одну точку
function activateDot(originalPath) {
  if (originalPath.classList.contains("active")) return;

  const clone = originalPath.cloneNode();
  svg.appendChild(clone);

  clone.setAttribute("fill", "white");
  clone.setAttribute("filter", "url(#glow)");
  clone.classList.add("dot-glow");

  originalPath.classList.add("active");

  setTimeout(() => {
    clone.remove();
    originalPath.classList.remove("active");
  }, 10000); // 10 сек
}

// Запускаем волну точек каждые 500 мс
setInterval(() => {
  const count = 4; // Количество точек за одну волну
  const usedIndices = new Set();

  while (usedIndices.size < count) {
    const index = Math.floor(Math.random() * allPaths.length);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      const randomPath = allPaths[index];
      if (randomPath) activateDot(randomPath);
    }
  }
}, 500);
