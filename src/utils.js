
export const translateFigure = (figure, vector) =>
  figure.map((point) => ({
    x: point.x + vector.x,
    y: point.y + vector.y,
  }));

// Funkcja obrotu
export const rotateFigure = (figure, pivot, angle) => {
  const radians = (Math.PI / 180) * angle; // Konwersja kąta na radiany
  const { x: cx, y: cy } = pivot;

  return figure.map(({ x, y }) => {
    const newX =
      Math.cos(radians) * (x - cx) - Math.sin(radians) * (y - cy) + cx;
    const newY =
      Math.sin(radians) * (x - cx) + Math.cos(radians) * (y - cy) + cy;

    return { x: newX, y: newY };
  });
};


// Funkcja skalowania
export const scaleFigure = (figure, center, scaleFactor) =>
  figure.map((point) => ({
    x: center.x + (point.x - center.x) * scaleFactor,
    y: center.y + (point.y - center.y) * scaleFactor,
  }));
