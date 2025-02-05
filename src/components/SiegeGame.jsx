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
    const [phase, setPhase] = useState(1);

    // Map Ban Phase
    const [mapBanPhase, setMapBanPhase] = useState(false);
    const [oppBanPhase, setOppBanPhase] = useState(false);
    const [oppBans, setOppBans] = useState(false);
    const [map, setMap] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setbanner(true);
            {phase === 2 ? setMapBanPhase(true) :  setMapBanPhase(false)}
            {phase === 1 ? setOppBanPhase(true) :  setOppBanPhase(false)}
        }, 1000);
    }, [phase])

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
        setPhase(phase + 1);
    };

    const MapSet = (map) => {
        setMap(map);
        setPhase(phase + 1);
    };

    const startTimer = (value) => {
        setTimer(value);
        setTimerId(timerId + 1);
    };

    return (
        <div className='SiegeGame'>
            {banner && <SiegeBanner time={Timer} timerdone={timerCompleted} timerId={timerId} />}
            {mapBanPhase && <SiegemapBan startTimer={startTimer} timerDone={timerDone} map={MapSet} />}
            {oppBanPhase && <SiegeOppBan startTimer={startTimer} timerDone={timerDone} oppsBans={OppBansSet} />}
        </div>
    )
}

export default SiegeGame
