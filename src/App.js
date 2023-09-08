import React, { useState } from "react";
import "./App.css";
import CatsImage from "./components/CatsImage";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentSelection = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="App">
      <div className="background-color"></div>

      <div className="component-selection">
        <button
          onClick={() => handleComponentSelection("timer")}
          className={selectedComponent === "timer" ? "selected-component" : ""}
        >
          <span>Timer</span>
        </button>
        <button
          onClick={() => handleComponentSelection("stopwatch")}
          className={
            selectedComponent === "stopwatch" ? "selected-component" : ""
          }
        >
          <span>Stopwatch</span>
        </button>
      </div>

      {selectedComponent === "timer" && <Timer />}
      {selectedComponent === "stopwatch" && <Stopwatch />}

      <div className="component-image">
        <CatsImage />
      </div>
    </div>
  );
}


export default App;
