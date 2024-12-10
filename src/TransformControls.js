import React, { useState } from "react";
import { translateFigure, rotateFigure, scaleFigure } from "./utils";

const TransformControls = ({ selectedFigure, figures, setFigures, onSave, onLoad }) => {
  const [vector, setVector] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [scale, setScale] = useState(1);
  const [pivot, setPivot] = useState({ x: 0, y: 0 });

  const handleTransform = (type) => {
    if (selectedFigure === null || selectedFigure < 0) {
      alert("Wybierz figurę do transformacji!");
      return;
    }

    const updatedFigures = [...figures];
    const figure = updatedFigures[selectedFigure];

    if (type === "translate") {
      updatedFigures[selectedFigure] = translateFigure(figure, vector);
    } else if (type === "rotate") {
      updatedFigures[selectedFigure] = rotateFigure(figure, pivot, angle);
    } else if (type === "scale") {
      updatedFigures[selectedFigure] = scaleFigure(figure, pivot, scale);
    }

    setFigures(updatedFigures);
  };

  const saveToFile = (figures) => {
    const blob = new Blob([JSON.stringify(figures, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'figures.json';
    link.click();
  };

  const loadFromFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedFigures = JSON.parse(e.target.result);
          setFigures(loadedFigures);
        } catch (error) {
          alert('Błąd wczytywania pliku');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <h3>Transform Controls</h3>
      <div>
        <h4>Translate</h4>
        <input
          type="number"
          placeholder="dx"
          value={vector.x}
          onChange={(e) => setVector({ ...vector, x: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          placeholder="dy"
          value={vector.y}
          onChange={(e) => setVector({ ...vector, y: parseFloat(e.target.value) })}
        />
        <button onClick={() => handleTransform("translate")}>Apply</button>
      </div>

      <div>
        <h4>Rotate</h4>
        <input
          type="number"
          placeholder="Angle (in degrees)"
          value={angle}
          onChange={(e) => setAngle(parseFloat(e.target.value))}
        />
        <div>
          <input
            type="number"
            placeholder="Pivot X"
            value={pivot.x}
            onChange={(e) => setPivot({ ...pivot, x: parseFloat(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Pivot Y"
            value={pivot.y}
            onChange={(e) => setPivot({ ...pivot, y: parseFloat(e.target.value) })}
          />
        </div>
        <button onClick={() => handleTransform("rotate")}>Apply</button>
      </div>

      <div>
        <h4>Scale</h4>
        <input
          type="number"
          placeholder="Scale Factor"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />
        <button onClick={() => handleTransform("scale")}>Apply</button>
      </div>

      <div>
        <button onClick={() => saveToFile(figures)}>Save to File</button>
        <input type="file" onChange={loadFromFile} />
      </div>
    </div>
  );
};

export default TransformControls;