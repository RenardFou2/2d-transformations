import React, { useState } from "react";

const Canvas = ({ figures, setFigures, selectedFigure, setSelectedFigure }) => {
  const [currentFigure, setCurrentFigure] = useState([]);

  const handleMouseDown = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentFigure([...currentFigure, { x, y }]);
  };

  const handleFinishFigure = () => {
    if (currentFigure.length > 2) {
      setFigures([...figures, currentFigure]);
    }
    setCurrentFigure([]);
  };

  return (
    <div style={{ border: "1px solid black", width: "600px", height: "400px" }}>
      <svg
        width="100%"
        height="100%"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleFinishFigure}
      >
        {figures.map((figure, index) => (
          <polygon
            key={index}
            points={figure.map((p) => `${p.x},${p.y}`).join(" ")}
            fill={selectedFigure === index ? "rgba(0, 0, 255, 0.3)" : "none"}
            stroke="black"
            onClick={() => setSelectedFigure(index)}
          />
        ))}
        {currentFigure.length > 0 && (
          <polygon
            points={currentFigure.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="blue"
          />
        )}
      </svg>
    </div>
  );
};

export default Canvas;
