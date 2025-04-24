import React, { useState } from "react";
import ImagePreloader from "../utils/ImagePreloader";
import "./WelcomeScreen.scss";

const WelcomeScreen = ({ start }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const goFullScreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    };

    return (
        <div id="welcome">
            <img src="/images/7907369fa863844fc1ae432a9ca0e610.jpg" alt="gfdgfd" />
            <div className="conent">
                <h1>RAINBOW SIX SIEGE - UI TEST</h1>
                <ImagePreloader onComplete={() => setIsLoaded(true)} />
                <div className="options">
                    <p>going full screen gives a better experience</p>
                    <button className="FullScreen" onClick={goFullScreen}>Go FullScreen</button>
                    <button
                        className="start"
                        onClick={() => start()}
                        disabled={!isLoaded}
                    >
                        {isLoaded ? "START SIEGE" : "loading"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default WelcomeScreen;
