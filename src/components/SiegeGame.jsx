import { useEffect, useState } from "react";
import "./SiegeGame.scss";
import SiegemapBan from "./Match/SiegemapBan";
import SiegeBanner from "./Match/SiegeBanner";
import SiegeOppBan from "./Match/SiegeOppBan";
import RankedStartbanner from "./Match/RankedStartbanner";
import EndBanPhase from "./Match/endBanPhase";
import PvpGame from "./Match/PvpGame";

const SiegeGame = () => {
  const [Timer, setTimer] = useState(null);
  const [timerId, setTimerId] = useState(0);
  const [timerDone, setTimerDone] = useState(null);
  const [phase, setPhase] = useState(1);
  const [phasEnder, setPhasEnder] = useState(false);
  const [Bans, setOppBans] = useState([]);
  const [map, setMap] = useState(null);
  const [side, setSide] = useState(Math.random() < 0.5);


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
        <EndBanPhase
          side={side}
          map={map ? map.replace(/\s+/g, "") : ""}
          done={startscrenndone}
        />
      ) : null}
      {phase === 5 ? (
        <PvpGame />
      ) : null}
      {phase === 6 ? (
        <div className="done">
          <h6>Done for now, have a good day</h6>
          <div className="btns">
            <button onClick={() => window.location.reload()}>Refresh Page</button>
            <button onClick={() => (window.location.href = "/")}>Go to Main Page</button>
          </div>

          <p>Map: {map}</p>
          <div>
            Bans:
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
