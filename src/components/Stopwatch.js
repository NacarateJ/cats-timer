import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./Stopwatch.scss";

const Stopwatch = ({ toggleAppActivity }) => {
  const [time, setTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  /**
   * Effect hook for updating time at regular intervals when the stopwatch is running.
   */
  useEffect(() => {
    let intervalId;

    if (isStopwatchRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isStopwatchRunning]);

  /**
   * Format the time in hours, minutes, seconds, and milliseconds.
   *
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
   * Handle the start or stop button click.
   * Toggles the stopwatch running state and informs the parent component of the change.
   */
  const handleStartStop = () => {
    setIsStopwatchRunning((prevIsRunning) => !prevIsRunning);
    toggleAppActivity(!isStopwatchRunning);
  };

  /**
   * Handle the reset button click.
   * Stops the stopwatch and resets the time to zero, and informs the parent component of the change.
   */
  const handleReset = () => {
    setIsStopwatchRunning(false);
    setTime(0);
    toggleAppActivity(false);
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch-display">{formatTime()}</div>
      <div className="stopwatch-controls">
        {isStopwatchRunning ? (
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
