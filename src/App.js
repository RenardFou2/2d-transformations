import React, { useState } from "react";
import Canvas from "./Canvas";
import TransformControls from "./TransformControls";
import { saveFigures, loadFigures } from "./localStorage";

const App = () => {
  const [figures, setFigures] = useState(loadFigures() || []);
  const [selectedFigure, setSelectedFigure] = useState(null);

  const handleFigureUpdate = (updatedFigure, index) => {
    const newFigures = [...figures];
    newFigures[index] = updatedFigure;
    setFigures(newFigures);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Canvas
        figures={figures}
        setFigures={setFigures}
        selectedFigure={selectedFigure}
        setSelectedFigure={setSelectedFigure}
      />
      <TransformControls
        selectedFigure={selectedFigure}
        setFigures={setFigures}
        figures={figures}
        handleFigureUpdate={handleFigureUpdate}
        onSave={() => saveFigures(figures)}
        onLoad={() => setFigures(loadFigures() || [])}
      />
    </div>
  );
};

export default App;
