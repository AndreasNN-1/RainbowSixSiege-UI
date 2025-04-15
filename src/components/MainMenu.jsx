import React, { useEffect, useState } from "react"
import "./MainMenu.scss"

const MainMenu = ({ startGame }) => {
    const [page, setPage] = useState(0);
    useEffect(() => {

        const audio = new Audio("audio/mainmenu.wav");
        audio.volume = 0.01;
        if (!audio.paused) {
            audio.currentTime = 0;
            audio.play();
        } else {
            audio.play();
        }

    }, [])

    const Startgame = () => {
        const audio = new Audio('audio/matchstart.wav');
        audio.play();

        setTimeout(() => {
            startGame()
        }, 5000)
    }

    return (
        <div id="MainMenu">
            {/* <img src="/test/backimg.png" alt="gfdgfd" /> */}

            <nav>
                <ul>
                    <li className={page === 0 ? "active" : ""}>
                        <span>
                            <img src="/images/rainbow-six-siege-logo.png" alt="logo" />
                        </span>
                        <div className="bar" />
                    </li>
                    <li className={page === 1 ? "active" : ""}>
                        <span>
                            OPERATORS
                        </span>
                        <div className="bar" />
                    </li>
                    <li className={page === 2 ? "active" : ""}>
                        <span>
                            LOCKER
                        </span>
                        <div className="bar" />
                    </li>
                    <li className={page === 3 ? "active" : ""}>
                        <span>
                            CAREER
                        </span>
                        <div className="bar" />
                    </li>
                    <li className={page === 4 ? "active" : ""}>
                        <span>
                            BATTLE PASS
                        </span>
                        <div className="bar" />
                    </li>
                    <li className={page === 5 ? "active" : ""}>
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
                            <span className="levelText">500</span>
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
                            <span>150 000</span>
                        </div>
                        <div className="Credits">
                            <img src="/images/credits.png" alt="Credits" />
                            <span>35 000</span>
                        </div>
                    </div>

                    <div id="settings">
                        <img src="/images/settings.png" alt="settings" />
                    </div>
                </menu>
            </nav>

            <div id="menuUI">
                <div className="play">
                    <button className="button-nem">
                        <h4>PLAY</h4>
                    </button>
                    <button className="button-nem" onClick={() => Startgame()}>
                        <h4>RANKED</h4>
                        <p>last played</p>
                    </button>
                </div>
                <button className="button-pass">PLAY</button>
                <div className="odther">
                    <button className="button-op">
                        <h4>PLAY</h4>
                    </button>
                    <button className="button-op">
                        <h4>PLAY</h4>
                    </button>
                    <button className="button-op">
                        <h4>PLAY</h4>
                    </button>
                    <button className="button-op">
                        <h4>PLAY</h4>
                    </button>
                </div>
                <button className="button-news">PLAY</button>
                <button className="button-intfi">PLAY</button>
            </div>
        </div>
    );
};

export default MainMenu;