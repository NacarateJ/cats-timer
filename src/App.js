import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import CatsImage from "./components/CatsImage";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [appActivity, setAppActivity] = useState(false);

  const handleComponentSelection = (component) => {
    setSelectedComponent(component);
  };

   useEffect(() => {
     setAppActivity(false);
   }, [selectedComponent]);

  const toggleAppActivity = (activity) => {
    setAppActivity(activity);
  }

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

      {selectedComponent === "timer" && (
        <Timer toggleAppActivity={toggleAppActivity} />
      )}
      {selectedComponent === "stopwatch" && (
        <Stopwatch toggleAppActivity={toggleAppActivity} />
      )}

      {appActivity && (
        <div className="component-image">
          <CatsImage />
        </div>
      )}
    </div>
  );
}


export default App;
