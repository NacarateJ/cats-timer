import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

const Timer = () => {
  const [remainingTimeInSec, setRemainingTimeInSec] = useState(5 * 60); // Default 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false); // Track if the time has reached 0

  const audioRef = useRef(null); // Ref for audio element

  /**
   * Timer logic using useEffect.
   */
  useEffect(() => {
    let intervalId;

    if (isTimerRunning && remainingTimeInSec > 0) {
      intervalId = setInterval(() => {
        setRemainingTimeInSec((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTimeInSec === 0 && isTimerRunning) {
      // Timer reached 0, stop it, play sound, and set isTimeUp to true
      setIsTimerRunning(false);
      handleSoundAlert();
      setIsTimeUp(true);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, remainingTimeInSec]);

  /**
   * Format time in hh:mm:ss.
   * @param {number} timeInSeconds - Time in seconds to format.
   * @returns {string} - Formatted time in hh:mm:ss format.
   */
  const formatTime = (timeInSeconds) => {const formattedHours = ("0" + Math.floor(timeInSeconds / 3600)).slice(-2);
    const formattedMinutes = (
      "0" + Math.floor((timeInSeconds % 3600) / 60)
    ).slice(-2);
    const formattedSeconds = ("0" + (timeInSeconds % 60)).slice(-2);
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  /**
   * Handle start/stop button click.
   */
  const handleStartStop = () => {
    const totalSeconds =
      inputHours * 3600 + inputMinutes * 60 + parseInt(inputSeconds);

    if (resetTime) {
      setRemainingTimeInSec(totalSeconds);
      setResetTime(false); // Hide the form when starting the timer
    }

    setIsTimerRunning((prevIsRunning) => !prevIsRunning);
  };

  /**
   * Handle reset button click.
   */
  const handleReset = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
    }

    setResetTime(true);
    setIsTimeUp(false);
    handleStopSound();
  };

  /**
   * Handle sound alert.
   */
  const handleSoundAlert = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Start the audio playback
    }
  };

  /**
   * Handle stop sound.
   */
  const handleStopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio playback
      audioRef.current.currentTime = 0; // Reset audio time to start
    }
  };

  /**
   * Handle input change for custom timer.
   * @param {Object} e - Event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure that the input values are non-negative
    const nonNegativeValue = Math.max(0, parseInt(value));

    // Update the corresponding state based on the input field name
    switch (name) {
      case "hours":
        setInputHours(isNaN(nonNegativeValue) ? 0 : nonNegativeValue);
        break;
      case "minutes":
        setInputMinutes(isNaN(nonNegativeValue) ? 0 : nonNegativeValue);
        break;
      case "seconds":
        setInputSeconds(isNaN(nonNegativeValue) ? 0 : nonNegativeValue);
        break;
      default:
        break;
    }
  };

  return (
    <div className="timer">
      {resetTime ? (
        <div className="timer-form">
          <label htmlFor="timerInputs">Set Timer:</label>
          <input
            id="timerInputHours"
            name="hours"
            type="number"
            placeholder="00h"
            min="0"
            value={inputHours === 0 ? "" : inputHours}
            onChange={handleInputChange}
          />
          <input
            id="timerInputMinutes"
            name="minutes"
            type="number"
            placeholder="00m"
            min="0"
            max="59"
            value={inputMinutes === 0 ? "" : inputMinutes}
            onChange={handleInputChange}
          />
          <input
            id="timerInputSeconds"
            name="seconds"
            type="number"
            placeholder="00s"
            min="0"
            max="59"
            value={inputSeconds === 0 ? "" : inputSeconds}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="timer-display">
          {isTimeUp ? "Time is up!" : formatTime(remainingTimeInSec)}
        </div>
      )}
      <div className="timer-controls">
        {isTimeUp ? (
          <>
            <Button onClick={handleStopSound} text="Ok" />
            <Button onClick={handleReset} text="Reset" />
          </>
        ) : (
          <>
            {isTimerRunning ? (
              <>
                <Button onClick={handleStartStop} text="Stop" />
                <Button onClick={handleReset} text="Reset" />
              </>
            ) : (
              <>
                <Button onClick={handleStartStop} text="Start" />
                <Button onClick={handleReset} text="Reset" />
              </>
            )}
          </>
        )}
        <audio ref={audioRef} loop data-testid="audio-element">
          <source src="/cat-meows.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default Timer;
