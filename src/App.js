import React, { useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentSelection = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="App">
      <div className="component-selection">
        <button onClick={() => handleComponentSelection("timer")}>Timer</button>
        <button onClick={() => handleComponentSelection("stopwatch")}>Stopwatch</button>
      </div>
      {selectedComponent === "timer" && <Timer />}
      {selectedComponent === "stopwatch" && <Stopwatch />}
    </div>
  );
}

export default App;
