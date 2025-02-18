import { useEffect, useState } from "react";
import "./SiegemapBan.scss";
import data from "../assets/data/maps.json";

const SiegemapBan = ({ startTimer, timerDone, map }) => {
  const [maps, setMaps] = useState([]);
  const [showMaps, setShowMaps] = useState(false);
  const [showresults, setshowresults] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const [mapClicked, setMapClicked] = useState(null);
  const [mapsBanned, setmapsBanned] = useState([]);
  const [actionMap, setActionMap] = useState(null);
  const [mapPicked, setMapPicked] = useState(false);
  const [timerdone, setTimerDone] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [PickerActive, setpickerActive] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const rankedMaps = data.filter((map) => map.type.includes("Ranked"));
      const shuffledMaps = rankedMaps
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      setMaps(shuffledMaps);
      setShowMaps(true);
      setTimeout(() => {
        shuffledMaps.forEach((_, index) => {
          setTimeout(() => {
            setVisibleIndexes((prev) => [...prev, index]);
          }, index * 100);
        }, 100);
      });
      startTimer(15);
    }, 3500);
  }, []);

  useEffect(() => {
    if (timerDone === true) {
      setTimerDone(timerDone);
      const mapsAudio = new Audio('audio/maps.wav');
      mapsAudio.volume = 1;
      mapsAudio.play();
      if (timerDone) {
        setmapsBanned((prev) => {
          let validMapClicked = mapClicked !== null ? mapClicked : 5;
          let newBannedMaps = [
            validMapClicked,
            Math.floor(Math.random() * maps.length),
          ];
          while (newBannedMaps[0] === newBannedMaps[1]) {
            newBannedMaps[1] = Math.floor(Math.random() * maps.length);
          }

          return newBannedMaps;
        });


        setTimeout(() => {
          setshowresults(true);
          setTimeout(() => {
            setShowMaps(false);
            setpickerActive(true);
          }, 1000);
        }, 300);
      }
    }
  }, [timerDone]);

  useEffect(() => {
    if (mapsBanned.length > 0) {
      setTimeout(() => {
        PickaMap();
      }, 1000);
    }
  }, [PickerActive]);

  const PickaMap = () => {
    if (mapsBanned.length === 0) return;

    let index = 0;
    let filteredIndexes = maps
      .map((_, i) => i)
      .filter((i) => !mapsBanned.includes(i));

    if (filteredIndexes.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex(filteredIndexes[index]);

      setTimeout(() => {
        setActiveIndex(null);
      }, 100);

      index = (index + 1) % filteredIndexes.length;
    }, 200);

    setTimeout(() => {
      clearInterval(interval);

      const randomIndex = filteredIndexes[Math.floor(Math.random() * filteredIndexes.length)];

      setActionMap(randomIndex);
      const TheMap = maps[randomIndex]?.name;
      setMapPicked(true);

      setTimeout(() => {
        setshowresults(false);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            map(TheMap);
          }, 1500);
        }, 3000);
      }, 2500);
    }, 2000);

    return () => clearInterval(interval);
  };


  const MapCheck = (index) => {
    const clicked = new Audio('audio/click.wav');
    if (!clicked.paused) {
      clicked.currentTime = 0;
      clicked.play();
    } else {
      clicked.play();
    }
    setMapClicked(index);
  };

  const playHoverSound = () => {
    const audio = new Audio("audio/hover.wav");
    audio.volume = 0.2;
    if (!audio.paused) {
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.play();
    }
  };

  return (
    <div className="SiegemapBan">
      <div className="main">
        <div className={`broder-left ${mapPicked ? "avtive" : ""}`}></div>
        <div className={`broder-right ${mapPicked ? "avtive" : ""}`}></div>
        <div id="title">
          <p>
            <span>START OF</span>
          </p>
          <h1>
            <span>MAP BAN PHASE</span>
          </h1>
        </div>
        {showMaps && (
          <div className={`ban-box ${timerdone ? "pickedBanComplete" : ""}`}>
            <div id="title2">
              <h1>
                <span>MAP BAN</span>
              </h1>
              <p>
                <span>BOTH TEAMS ARE NOW BANNING</span>
              </p>
            </div>
            <div className="map-list">
              {maps.map((map, index) => (
                <div
                  key={index}
                  className={`map-item ${visibleIndexes.includes(index) ? "visible" : ""
                    }`}
                  onClick={!timerdone ? () => MapCheck(index) : null}
                  onMouseEnter={playHoverSound}
                >
                  <img src={`maps/${map.img}`} alt={map.name} />
                  <div className="map-item-text">
                    <p>{map.name}</p>
                  </div>
                  <div
                    className={`mapPicks ${!timerdone && mapClicked === index ? "visible" : ""
                      }`}
                  >
                    1
                  </div>
                </div>
              ))}
            </div>
            <div
              className="noban"
              onClick={!timerdone ? () => MapCheck(5) : null}
              onMouseEnter={playHoverSound}
            >
              <p>NO BAN</p>
              <div
                className={`nobanPick ${!timerdone && mapClicked === 5 ? "visible" : ""
                  }`}
              >
                1
              </div>
            </div>
          </div>
        )}
        {showresults && (
          <div className="mapbanResults">
            <div className="con">
              <div id="title3">
                <h1>
                  <span>MAP SELECTION</span>
                </h1>
              </div>
              <div className="maps">
                {maps.map((map, index) => (
                  <div
                    key={index}
                    className={`map ${activeIndex === index ? "toggle" : ""} ${mapPicked
                      ? actionMap === index
                        ? "selected"
                        : "notSelected"
                      : ""
                      }`}
                  >
                    {mapsBanned.includes(index) && (
                      <div className="ban-banner">
                        <div className="banner">
                          <img
                            className="banIcon"
                            src="0-8392_white-no-symbol-clip-art-at-clipart-library.png"
                            alt="banned"
                          />
                          {mapsBanned[0] === mapsBanned[1] &&
                            mapsBanned[0] === index ? (
                            <div className="double-ban"></div>
                          ) : (
                            <div
                              className={`single-ban ${mapsBanned[1] === index ? "opponent" : "allies"
                                }`}
                            ></div>
                          )}
                        </div>
                      </div>
                    )}
                    <img
                      className={mapsBanned.includes(index) ? "banned" : ""}
                      src={`maps/${map.img}`}
                      alt={map.name}
                    />
                    <p>{map.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {mapPicked && (
          <div className={`selectedMap item${actionMap}`}>
            <div className="continer">
              <img
                src={`maps/${maps[actionMap]?.img}`}
                alt={maps[actionMap]?.name}
              />
              <div className="mapInfo">
                <h2 className="mapTitle">MAP SELECTED</h2>
                <h1 className="mapname">{maps[actionMap]?.name}</h1>
              </div>
            </div>
          </div>
        )}
        {fadeOut && (
          <div className="fadeOut">
            <img src="Untitled-1.jpg" alt="back" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SiegemapBan;
