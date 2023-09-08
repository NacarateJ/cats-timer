import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./Stopwatch.scss";

const Stopwatch = () => {
  const [time, setTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  /**
   * Effect hook for updating time at regular intervals when the stopwatch is running.
   */
  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime +10);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  /**
   * Format the time in hours, minutes, seconds, and milliseconds.
   * @returns {string} - Formatted time string.
   */
  const formatTime = () => {
   const formattedHours = ("0" + Math.floor((time / 3600000) % 24)).slice(-2);
   const formattedMinutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
   const formattedSeconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
   const formattedMilliseconds = ("0" + ((time / 10) % 100)).slice(-2);

   if (formattedHours !== "00") {
     return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s ${formattedMilliseconds}`;
   } else if (formattedMinutes !== "00") {
     return `${formattedMinutes}m ${formattedSeconds}s ${formattedMilliseconds}`;
   } else {
     return `${formattedSeconds}s ${formattedMilliseconds}`;
   }
  };

  /**
   * Handle start/stop button click to toggle the stopwatch.
   */
  const handleStartStop = () => {
    setIsTimerRunning((prevIsRunning) => !prevIsRunning);
  };

  /**
   * Handle reset button click to reset the stopwatch.
   */
  const handleReset = () => {
    setIsTimerRunning(false);
    setTime(0);
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch-display">{formatTime()}</div>
      <div className="stopwatch-controls">
        {isTimerRunning ? (
          <Button onClick={handleStartStop} text="Stop" />
        ) : (
          <Button onClick={handleStartStop} text="Start" />
        )}
        <Button onClick={handleReset} text="Reset" />
      </div>
    </div>
  );
};

export default Stopwatch;
