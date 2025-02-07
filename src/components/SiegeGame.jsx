import { useEffect, useState } from "react";
import "./SiegeGame.scss";
import SiegemapBan from "./SiegemapBan";
import SiegeBanner from "./SiegeBanner";
import SiegeOppBan from "./SiegeOppBan";

const SiegeGame = () => {
  const [Timer, setTimer] = useState(null);
  const [timerId, setTimerId] = useState(0);
  const [timerDone, setTimerDone] = useState(null);
  const [phase, setPhase] = useState(0);
  const [phasEnder, setPhasEnder] = useState(false);
  const [Bans, setOppBans] = useState([]);
  const [map, setMap] = useState(false);
  const [side, setSide] = useState(Math.random() < 0.5);

  useEffect(() => {
    setTimeout(() => {
      if (phase === 0) {
        setPhase(1);
      } else if (phasEnder === true) {
        setPhase(phase + 1);
        setPhasEnder(false);
      }
    }, 2000);
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
      "color: blue; font-weight: bold;",
      "color: white;",
      "color: green; font-weight: bold;"
    );
    setOppBans(oppsBans);
    setPhasEnder(true);
  };

  const MapSet = (map) => {
    console.log(
      "%c[GAME] %cThe map picked is: %c" + map,
      "color: blue; font-weight: bold;",
      "color: white;",
      "color: green; font-weight: bold;"
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
      {phase > 1 ? (
        <SiegeBanner
          side={side}
          time={Timer}
          timerdone={timerCompleted}
          timerId={timerId}
        />
      ): null}
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
