import React, { useState } from "react";
import SiegeGame from "./components/SiegeGame";
import MainMenu from "./components/MainMenu";
import WelcomeScreen from "./components/WelcomeScreen";
function App() {

  // 0 = Welcome Screen
  // 1 = main menu
  // 2 = ranked game
  const [state, setState] = useState(0);
  const [startAudio, setStartAudio] = useState(false);

  const UpTheState = () => {
    if (state === 0) {
      setStartAudio(true);
    }
    setState(state + 1);
  }

  return (
    <>
      {state == 0 && <WelcomeScreen start={UpTheState} />}
      {state == 1 && <MainMenu startAudio={startAudio} startGame={UpTheState} />}
      {state == 2 && <SiegeGame />}
    </>
  );
};

export default App;
