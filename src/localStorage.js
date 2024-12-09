export const saveFigures = (figures) => {
  localStorage.setItem('figures', JSON.stringify(figures));
};

export const loadFigures = () => {
  const storedFigures = localStorage.getItem('figures');
  return storedFigures ? JSON.parse(storedFigures) : [];
};
  