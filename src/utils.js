
export const translateFigure = (figure, vector) =>
  figure.map((point) => ({
    x: point.x + vector.x,
    y: point.y + vector.y,
  }));

// Funkcja obrotu
export const rotateFigure = (figure, center, angle) => {
  const radians = (Math.PI / 180) * angle;
  return figure.map((point) => ({
    x:
      center.x +
      (point.x - center.x) * Math.cos(radians) -
      (point.y - center.y) * Math.sin(radians),
    y:
      center.y +
      (point.x - center.x) * Math.sin(radians) +
      (point.y - center.y) * Math.cos(radians),
  }));
};

// Funkcja skalowania
export const scaleFigure = (figure, center, scaleFactor) =>
  figure.map((point) => ({
    x: center.x + (point.x - center.x) * scaleFactor,
    y: center.y + (point.y - center.y) * scaleFactor,
  }));
