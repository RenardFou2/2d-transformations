import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ figures, setFigures, selectedFigure, setSelectedFigure }) => {
  const canvasRef = useRef(null);
  const [currentPolygon, setCurrentPolygon] = useState([]); // Punkty aktualnie rysowanego wielokąta

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    figures.forEach((figure, index) => {
      ctx.beginPath();
      ctx.moveTo(figure[0].x, figure[0].y);
      figure.forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath();

      ctx.fillStyle = index === selectedFigure ? "rgba(0, 255, 0, 0.5)" : "rgba(0, 0, 255, 0.5)";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
    });

    if (currentPolygon.length > 0) {
      ctx.beginPath();
      ctx.moveTo(currentPolygon[0].x, currentPolygon[0].y);
      currentPolygon.forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath();
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  };

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedFigureIndex = figures.findIndex((figure) =>
      isPointInPolygon({ x, y }, figure)
    );

    if (clickedFigureIndex !== -1) {
      setSelectedFigure(clickedFigureIndex);
    } else {
      setCurrentPolygon([...currentPolygon, { x, y }]);
    }
  };

  const handleCanvasRightClick = (event) => {
    event.preventDefault();
    if (currentPolygon.length > 2) {
      setFigures([...figures, currentPolygon]);
      setCurrentPolygon([]);
    }
  };

  const isPointInPolygon = (point, polygon) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    draw(ctx);
  });

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid black", cursor: "pointer" }}
      onClick={handleCanvasClick}
      onContextMenu={handleCanvasRightClick}
    ></canvas>
  );
};

export default Canvas;
