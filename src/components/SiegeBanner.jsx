import { useEffect, useState } from "react";
import "./SiegeBanner.scss";

const SiegeBanner = ({ side, time, timerdone, timerId }) => {
  const [currentTime, setCurrentTime] = useState(false);
  const [timerComplete, setTimerComplete] = useState(true);
  const [danger, setDanger] = useState(false);
  const [danger2, setDanger2] = useState(false);
  const [Pulse, setPulse] = useState(false);

  useEffect(() => {
    if (time) {
      setCurrentTime(time);
      setTimerComplete(false);
    }
  }, [time, timerId]);

  useEffect(() => {
    if (currentTime <= 5 && currentTime > 3) {
      setDanger(true);
      setTimeout(() => {
        setDanger(false);
      }, 500);
    } else {
      setDanger(false);
    }

    if (currentTime <= 3 && currentTime > 0 && !timerComplete) {
      const audio = new Audio("audio/timetick.wav");
      audio.volume = 0.8;
      if (!audio.paused) {
        audio.currentTime = 0;
        audio.play();
      } else {
        audio.play();
      }
      setDanger2(true);
      setPulse(true);
      setTimeout(() => {
        setPulse(false);
      }, 500);
    } else {
      setDanger2(false);
      setPulse(false);
    }

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        }
        clearInterval(interval);
        return prevTime;
      });

      if (currentTime === 1) {
        setDanger(false);
        setTimerComplete(true);
        if (timerdone) {
          timerdone();
        }
        return;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    if (minutes === 0) {
      remainingSeconds = remainingSeconds - 1;
    }

    remainingSeconds = Math.max(remainingSeconds, 0);

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div id="banner">
      <div className="con">
        <div id="team1">YOUR TEAM</div>
        <div className="item-icon">
          {side ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
              <path
                fill="%2324262a"
                d="M8.32,19.16l-5.54,5.54H2V28h3.31v-0.79l5.54-5.54H8.32V19.16z M25.2,2L10.29,17.18L8.5,15.4l-0.94,0.94l1.87,1.87v2.36h2.36l1.87,1.87l0.94-0.94l-1.78-1.78L28,4.8V2H25.2z M21.68,19.16v2.52h-2.52l5.54,5.54V28H28v-3.31h-0.78L21.68,19.16z M14.6,11.98L4.8,2H2v2.8l9.98,9.8L14.6,11.98z M20.57,18.21l1.87-1.87L21.5,15.4l-1.78,1.78l-1.67-1.71l-2.56,2.56l1.7,1.67L15.4,21.5l0.94,0.94l1.87-1.87h2.36V18.21z"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
              <path
                fill="%2324262a"
                d="M19.27,9.74l-4.25,2.17L10.73,9.7L8.15,28h13.7L19.27,9.74z M21.23,7.01V2h-2.88v1.73h-1.96V2h-2.78v1.73h-1.96V2H8.77v4.96l6.25,3.51L21.23,7.01z"
              />
            </svg>
          )}
        </div>
      </div>
      <div className={`timer ${danger2 ? "danger2" : ""}`}>
        {timerComplete ? (
          <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 9 9 C 5.144531 9 2 12.144531 2 16 C 2 19.859375 5.140625 23 9 23 C 11.929688 23 13.71875 21.390625 15.09375 19.40625 C 14.683594 18.746094 14.339844 18.09375 14 17.46875 C 12.773438 19.496094 11.398438 21 9 21 C 6.242188 21 4 18.757813 4 16 C 4 13.226563 6.226563 11 9 11 C 10.617188 11 11.644531 11.578125 12.59375 12.5625 C 13.542969 13.546875 14.34375 14.96875 15.15625 16.46875 C 15.96875 17.96875 16.792969 19.546875 18 20.8125 C 19.207031 22.078125 20.871094 23 23 23 C 26.855469 23 30 19.855469 30 16 C 30 12.140625 26.859375 9 23 9 C 20.085938 9 18.285156 10.558594 16.90625 12.5 C 17.316406 13.148438 17.691406 13.785156 18.03125 14.40625 C 19.25 12.4375 20.609375 11 23 11 C 25.757813 11 28 13.242188 28 16 C 28 18.773438 25.773438 21 23 21 C 21.410156 21 20.410156 20.421875 19.46875 19.4375 C 18.527344 18.453125 17.722656 17.03125 16.90625 15.53125 C 16.089844 14.03125 15.25 12.453125 14.03125 11.1875 C 12.8125 9.921875 11.148438 9 9 9 Z" /></svg>
        ) : (
          <p
            className={`${danger ? "danger pulse" : ""} ${Pulse ? "pulse" : ""
              }`}
          >
            {formatTime(currentTime)}
          </p>
        )}
      </div>
      <div className="con">
        <div className="item-icon2">
          {!side ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
              <path
                fill="%2324262a"
                d="M8.32,19.16l-5.54,5.54H2V28h3.31v-0.79l5.54-5.54H8.32V19.16z M25.2,2L10.29,17.18L8.5,15.4l-0.94,0.94l1.87,1.87v2.36h2.36l1.87,1.87l0.94-0.94l-1.78-1.78L28,4.8V2H25.2z M21.68,19.16v2.52h-2.52l5.54,5.54V28H28v-3.31h-0.78L21.68,19.16z M14.6,11.98L4.8,2H2v2.8l9.98,9.8L14.6,11.98z M20.57,18.21l1.87-1.87L21.5,15.4l-1.78,1.78l-1.67-1.71l-2.56,2.56l1.7,1.67L15.4,21.5l0.94,0.94l1.87-1.87h2.36V18.21z"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
              <path
                fill="%2324262a"
                d="M19.27,9.74l-4.25,2.17L10.73,9.7L8.15,28h13.7L19.27,9.74z M21.23,7.01V2h-2.88v1.73h-1.96V2h-2.78v1.73h-1.96V2H8.77v4.96l6.25,3.51L21.23,7.01z"
              />
            </svg>
          )}
        </div>
        <div id="team2">OPPONENTS</div>
      </div>
    </div>
  );
};

export default SiegeBanner;
