import { useEffect } from "react";
import "./RankedStartbanner.scss";

const RankedStartbanner = ({ side, done }) => {
    useEffect(() => {
        setTimeout(() => {
            done();
        }, 6000);
    }, [])
    return (
        <div className="RankedStartbanner">
            <div className="RankedStart-back">
                <img className="RankedStart-img" src="/images/matchStartback.jpg" alt="startRanked" />
                <img className="RankedStart-opp" src="/images/matchStartOpp.png" alt="startRanked" />
            </div>
            <div className="RankedStart-title-banner">
                <div className="RankedStart-sides">
                    <div className="allieTeam">
                        {side ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                                <path
                                    fill="%2324262a"
                                    d="M8.32,19.16l-5.54,5.54H2V28h3.31v-0.79l5.54-5.54H8.32V19.16z M25.2,2L10.29,17.18L8.5,15.4l-0.94,0.94l1.87,1.87v2.36h2.36l1.87,1.87l0.94-0.94l-1.78-1.78L28,4.8V2H25.2z M21.68,19.16v2.52h-2.52l5.54,5.54V28H28v-3.31h-0.78L21.68,19.16z M14.6,11.98L4.8,2H2v2.8l9.98,9.8L14.6,11.98z M20.57,18.21l1.87-1.87L21.5,15.4l-1.78,1.78l-1.67-1.71l-2.56,2.56l1.7,1.67L15.4,21.5l0.94,0.94l1.87-1.87h2.36V18.21z"
                                />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                                <path
                                    fill="%2324262a"
                                    d="M19.27,9.74l-4.25,2.17L10.73,9.7L8.15,28h13.7L19.27,9.74z M21.23,7.01V2h-2.88v1.73h-1.96V2h-2.78v1.73h-1.96V2H8.77v4.96l6.25,3.51L21.23,7.01z"
                                />
                            </svg>
                        )}
                        <p>YOUR TEAM</p>
                    </div>
                    <div className="enemyTeam">
                        {!side ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                                <path
                                    fill="%2324262a"
                                    d="M8.32,19.16l-5.54,5.54H2V28h3.31v-0.79l5.54-5.54H8.32V19.16z M25.2,2L10.29,17.18L8.5,15.4l-0.94,0.94l1.87,1.87v2.36h2.36l1.87,1.87l0.94-0.94l-1.78-1.78L28,4.8V2H25.2z M21.68,19.16v2.52h-2.52l5.54,5.54V28H28v-3.31h-0.78L21.68,19.16z M14.6,11.98L4.8,2H2v2.8l9.98,9.8L14.6,11.98z M20.57,18.21l1.87-1.87L21.5,15.4l-1.78,1.78l-1.67-1.71l-2.56,2.56l1.7,1.67L15.4,21.5l0.94,0.94l1.87-1.87h2.36V18.21z"
                                />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                                <path
                                    fill="%2324262a"
                                    d="M19.27,9.74l-4.25,2.17L10.73,9.7L8.15,28h13.7L19.27,9.74z M21.23,7.01V2h-2.88v1.73h-1.96V2h-2.78v1.73h-1.96V2H8.77v4.96l6.25,3.51L21.23,7.01z"
                                />
                            </svg>
                        )}
                        <p>OPPONENTS</p>
                    </div>
                </div>
                <div className="RankedStart-texts">
                    <h2 className="RankedStart-title">COMPETITIVE</h2>
                    <h1 className="RankedStart-type">RANKED</h1>
                </div>
            </div>
        </div>
    );
};

export default RankedStartbanner;
