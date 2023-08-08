import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

const Timer = () => {
  const [time, setTime] = useState(5 * 60); // Default 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false); // Track if the time has reached 0

  const audioRef = useRef(null); // Ref for audio element

  // Timer logic
  useEffect(() => {
    let intervalId;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      // Timer reached 0, stop it, play sound, and set isTimeUp to true
      setIsRunning(false);
      handleSoundAlert();
      setIsTimeUp(true);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Format time in hh:mm:ss
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  // Handle start/stop button click
 const handleStartStop = () => {
   if (!isRunning) {
     const totalSeconds =
       inputHours * 3600 + inputMinutes * 60 + parseInt(inputSeconds);
     setTime(totalSeconds);
   }
   setIsRunning((prevIsRunning) => !prevIsRunning);
   setShowForm(false); // Hide the form when starting the timer
 };

  // Handle reset button click
  const handleReset = () => {
    if (isRunning) {
      setIsRunning(false);
    }

    setShowForm(true);
    setInputHours(0);
    setInputMinutes(0);
    setInputSeconds(0);
    setIsTimeUp(false);
    handleStopSound();
  };

  // Handle sound alert
  const handleSoundAlert = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Start the audio playback
    }
  };

  // Handle stop sound
  const handleStopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio playback
      audioRef.current.currentTime = 0; // Reset audio time to start
    }
  };

  // Handle input change for custom timer
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
      {showForm ? (
        <div className="timer-form">
          <label htmlFor="timerInputs">Set Timer:</label>
          <input
            id="timerInputHours"
            name="hours"
            type="number"
            placeholder="00h"
            min="0"
            value={inputHours === 0 ? '' : inputHours}
            onChange={handleInputChange}
          />
          <input
            id="timerInputMinutes"
            name="minutes"
            type="number"
            placeholder="00m"
            min="0"
            max="59"
            value={inputMinutes === 0 ? '' : inputMinutes}
            onChange={handleInputChange}
          />
          <input
            id="timerInputSeconds"
            name="seconds"
            type="number"
            placeholder="00s"
            min="0"
            max="59"
            value={inputSeconds === 0 ? '' : inputSeconds}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="timer-display">
          {isTimeUp ? "Time is up!" : formatTime(time)}
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
            {isRunning ? (
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
        <audio ref={audioRef} loop autoPlay>
          <source src="/cat-meows.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default Timer;
