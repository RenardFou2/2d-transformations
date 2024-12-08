export const saveFigures = (figures) => {
    localStorage.setItem("figures", JSON.stringify(figures));
  };
  
  export const loadFigures = () => {
    const data = localStorage.getItem("figures");
    return data ? JSON.parse(data) : null;
  };
  