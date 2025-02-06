import { useEffect, useState } from "react";
import "./SiegeGame.scss"
import SiegemapBan from "./SiegemapBan";
import SiegeBanner from "./SiegeBanner";
import SiegeOppBan from "./SiegeOppBan";

const SiegeGame = () => {
    const [banner, setbanner] = useState(false);
    const [Timer, setTimer] = useState(null);
    const [timerId, setTimerId] = useState(0);
    const [timerDone, setTimerDone] = useState(null);
    const [phase, setPhase] = useState(0);
    const [phasEnder, setPhasEnder] = useState(false)

    const [mapBanPhase, setMapBanPhase] = useState(false);
    const [oppBanPhase, setOppBanPhase] = useState(false);
    const [oppBans, setOppBans] = useState([]);
    const [map, setMap] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (phase === 0) {
                setbanner(true);
                setPhase(1);
            } else if (phasEnder === true) {
                setPhase(phase + 1);
                setPhasEnder(false);
            }
        }, 2000);
    }, [phasEnder])

    const timerCompleted = () => {
        console.log("setTimerDone: true");
        setTimerDone(true);
        setTimeout(() => {
            setTimerDone(false);
            console.log("setTimerDone: false");
        }, 100);
    };

    const OppBansSet = (oppsBans) => {
        setOppBans(oppsBans);
        setPhasEnder(true);
    };

    const MapSet = (map) => {
        setMap(map);
        setPhasEnder(true);
    };

    const startTimer = (value) => {
        setTimer(value);
        setTimerId(timerId + 1);
    };

    return (
        <div className="SiegeGame">
            {banner && <SiegeBanner time={Timer} timerdone={timerCompleted} timerId={timerId} />}
            {phase === 1 ? <SiegemapBan startTimer={startTimer} timerDone={timerDone} map={MapSet} /> : null}
            {phase === 2 ? <SiegeOppBan startTimer={startTimer} timerDone={timerDone} oppsBans={OppBansSet} /> : null}
        </div>
    )
}

export default SiegeGame
