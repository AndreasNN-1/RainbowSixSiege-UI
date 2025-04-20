import React, { useEffect, useRef, useState } from "react"
import "./MainMenu.scss"

const MainMenu = ({ startAudio, startGame }) => {
    const [seconds, setSeconds] = useState(0);
    const [page, setPage] = useState(0);
    const [findMatch, setFindMatch] = useState(false);
    const [matchFound, setMatchFound] = useState(false);

    const matchTimeoutRef = useRef(null);
    const startGameTimeoutRef = useRef(null);
    const menuAudioRef = useRef(null);
    const matchAudio = useRef(null);

    const playHoverSound = () => {
        const sound = new Audio("/audio/hover.wav");
        sound.volume = 0.08;
        sound.play().catch(err => console.warn("Hover sound error:", err));
    };

    const playClickSound = () => {
        const sound = new Audio("/audio/click.wav");
        sound.volume = 0.5;
        sound.play().catch(err => console.warn("Click sound error:", err));
    };

    useEffect(() => {
        if (!startAudio) return;

        const audio = new Audio("audio/mainmenu.wav");
        audio.volume = 0.025;
        audio.loop = true;
        menuAudioRef.current = audio;

        const playAudio = () => {
            audio.play().catch(err => {
                console.warn("Autoplay blocked or failed:", err);
            });
        }

        playAudio();


        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [startAudio]);

    const Startgame = () => {
        if (findMatch) {
            setFindMatch(false);
            clearTimeout(matchTimeoutRef.current);
            clearTimeout(startGameTimeoutRef.current);
            setMatchFound(false);
            setSeconds(0);

            if (matchAudio.current) {
                matchAudio.current.pause();
                matchAudio.current.currentTime = 0;
            }
        } else {
            setFindMatch(true);

            matchTimeoutRef.current = setTimeout(() => {
                setMatchFound(true);

                matchAudio.current = new Audio("audio/matchstart.wav");
                const playPromise = matchAudio.current.play();

                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.warn('Playback error:', error);
                    });
                }

                startGameTimeoutRef.current = setTimeout(() => {
                    startGame();
                }, 5000);
            }, 7300);
        }
    };

    useEffect(() => {
        if (findMatch) {
            const interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [findMatch]);



    return (
        <div id="MainMenu">
            <img src="/images/mainMenuback.jpg" alt="gfdgfd" />
            <nav>
                <div id="Starttimer" className={findMatch ? "active" : ""}>
                    {matchFound ?
                        (
                            <>
                                <h4>MATCH FOUND</h4>
                            </>
                        )
                        :
                        (
                            <>
                                <h4>CROSSPLAY - RANKED</h4>
                                <div className="timer">
                                    {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
                                </div>
                            </>
                        )}
                </div>
                <div id="navbox">
                    <ul>
                        <li
                            className={page === 0 ? "active" : ""}
                            onClick={() => setPage(0)}
                        >
                            <span>
                                <img src="/images/rainbow-six-siege-logo.png" alt="logo" />
                            </span>
                            <div className="bar" />
                        </li>
                        <li
                            className={page === 1 ? "active" : ""}
                            onClick={() => setPage(1)}
                        >
                            <span>
                                OPERATORS
                            </span>
                            <div className="bar" />
                        </li>
                        <li
                            className={page === 2 ? "active" : ""}
                            onClick={() => setPage(2)}
                        >
                            <span>
                                LOCKER
                            </span>
                            <div className="bar" />
                        </li>
                        <li
                            className={page === 3 ? "active" : ""}
                            onClick={() => setPage(3)}
                        >
                            <span>
                                CAREER
                            </span>
                            <div className="bar" />
                        </li>
                        <li
                            className={page === 4 ? "active" : ""}
                            onClick={() => setPage(4)}
                        >
                            <span>
                                BATTLE PASS
                            </span>
                            <div className="bar" />
                        </li>
                        <li
                            className={page === 5 ? "active" : ""}
                            onClick={() => setPage(5)}
                        >
                            <span>
                                SHOP
                            </span>
                            <div className="bar" />
                        </li>
                    </ul>

                    <menu>
                        <div className="user">
                            <div className="profile">
                                <img className="profileImg" src="/images/profile.png" alt="profile" />
                            </div>
                            <div className="member">
                                <img className="memberImg" src="/images/member.png" alt="member" />
                            </div>
                            <div className="rank">
                                <img className="rankImg" src="/images/champ.png" alt="rank" />
                            </div>
                            <div className="level">
                                <span className="levelText">347</span>
                                <img className="levelImg" src="/images/level.png" alt="level" />
                            </div>
                            <div className="team">
                                <span className="teamText">1/5</span>
                                <img className="teamImg" src="/images/group.png" alt="team" />
                            </div>
                        </div>

                        <div id="monney">
                            <div className="Renown">
                                <img src="/images/Renown.png" alt="Renown" />
                                <span>143 494</span>
                            </div>
                            <div className="Credits">
                                <img src="/images/credits.png" alt="Credits" />
                                <span>31 256</span>
                            </div>
                        </div>

                        <div id="settings">
                            <img src="/images/settings.png" alt="settings" />
                        </div>
                    </menu>
                </div>
            </nav >

            <div id="menuUI">
                <div className="play">
                    <button
                        className={`button-nem ${findMatch ? "active1" : ""}`}
                        onMouseEnter={playHoverSound}
                        onClick={() => {
                            playClickSound();
                        }}>
                        {findMatch ? (
                            <>
                                <h4>MATCHMAKING</h4>
                                <div className="dots">
                                    <div className="dot" />
                                    <div className="dot" />
                                    <div className="dot" />
                                </div>
                            </>
                        ) : (
                            <h4>PLAY</h4>
                        )}
                    </button>
                    <button
                        className={`button-nem ${findMatch ? "active2" : ""}`}
                        onMouseEnter={playHoverSound}
                        onClick={() => {
                            playClickSound();
                            Startgame();
                        }}
                    >
                        {findMatch ? (
                            <>
                                <h4>CANCEL</h4>
                            </>
                        ) : (
                            <>
                                <p>PLAY AGAIN</p>
                                <h4>RANKED</h4>
                            </>
                        )}
                    </button>
                </div>
                <button className="button-pass"
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                        playClickSound();
                    }}
                >
                    <div className="pass-back">
                        <img className="the-back" src="/images/battlepassback.jpg" alt="backpass" />
                        <img className="the-oppOne" src="/images/PassOppOne.png" alt="backpass" />
                        <img className="the-oppTwo" src="/images/PassOppTwo.png" alt="backpass" />
                    </div>
                    <div className="pass-content">
                        <div className="battlePasstitles">
                            <h5>BATTLE PASS</h5>
                            <h4>PREP PHASE</h4>
                            <div className="pass-timer">
                                <p>50d 15h 34m</p>
                            </div>
                        </div>
                        <div className="battlePass-progress">
                            <div className="pass-levels">
                                <p>LEVEL <span> 85 / 100</span></p>
                            </div>
                            <div className="progress-bar">
                                <div className="progress" />
                                <p>500 / 1000</p>
                            </div>
                        </div>
                    </div>
                </button>
                <div className="odther">
                    <button className="button-op"
                        onMouseEnter={playHoverSound}
                        onClick={() => {
                            playClickSound();
                        }}
                    >
                        <img src="/images/packs.png" alt="packs" />
                        <div className="texts">
                            <p>PACKS</p>
                            <h4><span>X</span>65</h4>
                        </div>
                    </button>
                    <button className="button-op"
                        onMouseEnter={playHoverSound}
                        onClick={() => {
                            playClickSound();
                        }}
                    >
                        <img src="/images/booster.png" alt="booster" className="booster" />
                        <div className="texts">
                            <p>BOOSTERS</p>
                            <h4><span>X</span>37</h4>
                        </div>
                    </button>
                    <button className="button-op"
                        onMouseEnter={playHoverSound}
                        onClick={() => {
                            playClickSound();
                        }}
                    >
                        <img src="/images/reputation.png" alt="reputation" />
                        <div className="texts">
                            <p>REPUTATION</p>
                            <h4>EXEMPLARY</h4>
                        </div>
                    </button>
                    <button className="button-op ubi">
                        <img src="/images/ubiBack.jpg" alt="ubiBack" />
                        <div className="boxA">
                            
                        </div>
                        <div className="theTexts">
                            <h5>UBISOFT</h5>
                            <p>CONNECT</p>
                        </div>
                    </button>
                </div>
                <button className="button-news"
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                        playClickSound();
                    }}
                >
                    <img src="/images/newSiegeX.webp" alt="SiegeX" />
                    <p className="title">SIEGE X</p>
                </button>
                <button className="button-intfi"
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                        playClickSound();
                    }}
                >
                    <img src="/images/bell.png" alt="bell" />
                    <div className="texts">
                        <p>NEWS</p>
                    </div>
                </button>
            </div>
        </div >
    );
};

export default MainMenu;