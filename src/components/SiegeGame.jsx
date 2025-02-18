import { useEffect, useState } from "react";
import "./SiegeGame.scss";
import SiegemapBan from "./SiegemapBan";
import SiegeBanner from "./SiegeBanner";
import SiegeOppBan from "./SiegeOppBan";
import RankedStartbanner from "./RankedStartbanner";

const SiegeGame = () => {
  const [Timer, setTimer] = useState(null);
  const [timerId, setTimerId] = useState(0);
  const [timerDone, setTimerDone] = useState(null);
  const [phase, setPhase] = useState(0);
  const [phasEnder, setPhasEnder] = useState(false);
  const [Bans, setOppBans] = useState([]);
  const [map, setMap] = useState(false);
  const [side, setSide] = useState(Math.random() < 0.5);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  useEffect(() => {
    if (phasEnder === true) {
      console.log(
        "%c[GAME] %cEnd of Phase " + phase + " and starting phase: " + (phase + 1),
        "color: green; font-weight: bold;",
        "color: white;"
      );
      setPhase(phase + 1);
      setPhasEnder(false);
    }
  }, [phasEnder]);

  const handleStartGame = () => {
    setIsButtonDisabled(true);
    const audio = new Audio('audio/matchstart.wav');
    audio.play();

    setTimeout(() => {
      setPhase(1);
    }, 5000);
  };

  const timerCompleted = () => {
    setTimerDone(true);
    setTimeout(() => {
      setTimerDone(false);
    }, 100);
  };

  const OppBansSet = (oppsBans) => {
    console.log(
      "%c[GAME] %cThe operators banned are: %c" + oppsBans,
      "color: green; font-weight: bold;",
      "color: white;",
      "color: red; font-weight: bold;"
    );
    setOppBans(oppsBans);
    setPhasEnder(true);
  };

  const startscrenndone = () => {
    console.log(
      "%c[GAME] %cEnded the match start screen",
      "color: green; font-weight: bold;",
      "color: white;",
    );
    setPhasEnder(true);
  };

  const MapSet = (map) => {
    console.log(
      "%c[GAME] %cThe map picked is: %c" + map,
      "color: green; font-weight: bold;",
      "color: white;",
      "color: red; font-weight: bold;"
    );
    setMap(map);
    setPhasEnder(true);
  };

  const startTimer = (value) => {
    setTimer(value);
    setTimerId(timerId + 1);
  };

  return (
    <div className="SiegeGame">

      {phase === 0 ?
        (<div id="start">
          <h1 className="start-title">Rainbow six siege</h1>
          <p>use PC and 16 : 9 for best experience</p>
          <button
            className="start-btn"
            onClick={handleStartGame}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? "Starting!" : "Start Game"}
          </button>

          <p>Note: <br />
            this is a private passion Project <br />
            where i trying to copy and remake the game Rainbow Six siege <br />
            specifically the start of a ranked match in the game
          </p>
        </div>)
        : null
      }
      {phase === 1 ?
        <RankedStartbanner
          side={side}
          done={startscrenndone}
        />
        : null
      }
      {phase >= 2 ? (
        <SiegeBanner
          side={side}
          time={Timer}
          timerdone={timerCompleted}
          timerId={timerId}
        />
      ) : null
      }
      {phase === 2 ? (
        <SiegemapBan
          startTimer={startTimer}
          timerDone={timerDone}
          map={MapSet}
        />
      ) : null}
      {phase === 3 ? (
        <SiegeOppBan
          side={side}
          startTimer={startTimer}
          timerDone={timerDone}
          oppsBans={OppBansSet}
        />
      ) : null}
      {phase === 4 ? (
        <div className="mapandbans">
          <p>map: {map}</p>
          <div>
            bans:
            <ul>
              {Bans.map((aban, index) => (
                <li key={index}>{aban}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SiegeGame;
