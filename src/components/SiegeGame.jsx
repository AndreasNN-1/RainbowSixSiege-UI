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


  useEffect(() => {
    if (phase === 0) {
      console.log(
        "%c[GAME] %cThe Game has started",
        "color: green; font-weight: bold;",
        "color: white;"
      );
      setPhase(1);
    } else if (phasEnder === true) {
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
        : null}
      {phase > 1 ? (
        <SiegeBanner
          side={side}
          time={Timer}
          timerdone={timerCompleted}
          timerId={timerId}
        />
      ) : null}
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
