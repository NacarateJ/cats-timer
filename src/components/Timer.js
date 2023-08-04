import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

const Timer = () => {
  const [time, setTime] = useState(5 * 60); // Default 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [inputTime, setInputTime] = useState(5); // User input for time
  const [selectedUnit, setSelectedUnit] = useState("minutes"); // Default unit: minutes
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
    const unitInSeconds = {
      seconds: 1,
      minutes: 60,
      hours: 3600,
    };
    setTime(inputTime * unitInSeconds[selectedUnit]);
    setIsRunning((prevIsRunning) => !prevIsRunning);
    setShowForm(false); // Hide the form when starting the timer
  };

  // Handle reset button click
  const handleReset = () => {
    if (isRunning) {
      setIsRunning(false);
    }

    setShowForm(true);
    setInputTime(0);
    setIsTimeUp(false); // Reset isTimeUp to false when resetting the timer
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
    setInputTime(e.target.value);
  };

  // Handle select change for unit of time (seconds, minutes, hours)
  const handleSelectChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  return (
    <div className="timer">
      {showForm ? (
        <div className="timer-form">
          <label htmlFor="timerInput">Set Timer (minutes):</label>
          <input
            id="timerInput"
            type="number"
            min="1"
            value={inputTime}
            onChange={handleInputChange}
          />
          <select value={selectedUnit} onChange={handleSelectChange}>
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
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
