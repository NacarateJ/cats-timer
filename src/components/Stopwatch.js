import React, { useState, useEffect } from "react";
import Button from "./Button";

const Stopwatch = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  /**
   * Effect hook for updating time at regular intervals when the stopwatch is running.
   */
  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);

        if (milliseconds >= 1000) {
          setMilliseconds(0);
          setSeconds((prevSeconds) => prevSeconds + 1);
        }

        if (seconds >= 60) {
          setSeconds(0);
          setMinutes((prevMinutes) => prevMinutes + 1);
        }

        if (minutes >= 60) {
          setMinutes(0);
          setHours((prevHours) => prevHours + 1);
        }
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, milliseconds, seconds, minutes]);

  /**
   * Format the time in hours, minutes, seconds, and milliseconds.
   * @returns {string} - Formatted time string.
   */
  const formatTime = () => {
    const formattedHours = hours.toString().padStart(1, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMilliseconds = milliseconds
      .toString()
      .padStart(3, "0")
      .slice(0, 2);

    if (hours > 0) {
      return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s ${formattedMilliseconds}`;
    } else if (minutes > 0) {
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
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
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
