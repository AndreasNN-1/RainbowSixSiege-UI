import { useEffect } from "react"
import "./EndBanPhase.scss"

const EndBanPhase = ({ map, side, done }) => {

    useEffect(()=> {
        setTimeout(() => {
            done();
        }, 4000);
    }, [])
    return (
        <div id="EndBanPhase">
            <img
                className="EndBanPhase-img"
                src={`maps/${map}.jpg`}
                alt={map}
            />
            <div className="EndBanPhase-title-banner">
                <div className="EndBanPhase-sides">
                    <div className="EndBanPhase-allieTeam">
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
                    <div className="EndBanPhase-rounds">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                stroke="none">
                                <path d="M2358 4949 c-740 -61 -1431 -480 -1825 -1108 l-53 -84 0 241 0 242
-160 0 -160 0 0 -520 0 -520 520 0 520 0 0 160 0 160 -240 0 c-132 0 -240 4
-240 8 0 17 125 212 193 302 383 504 1011 811 1654 810 547 -2 1081 -225 1468
-615 281 -282 480 -653 560 -1043 25 -121 45 -288 45 -373 l0 -49 161 0 162 0
-7 118 c-21 347 -94 628 -246 937 -237 484 -603 852 -1085 1090 -177 87 -298
133 -461 174 -284 72 -531 93 -806 70z"/>
                                <path d="M164 2445 c19 -343 98 -645 247 -945 314 -633 874 -1088 1550 -1259
234 -59 360 -75 599 -75 207 1 294 9 475 45 639 128 1208 520 1552 1068 l53
84 0 -241 0 -242 160 0 160 0 0 520 0 520 -520 0 -520 0 0 -160 0 -160 240 0
c132 0 240 -4 240 -8 0 -17 -124 -211 -192 -300 -427 -562 -1155 -876 -1856
-802 -824 88 -1509 639 -1766 1420 -63 190 -106 437 -106 601 l0 49 -162 0
-161 0 7 -115z"/>
                            </g>
                        </svg>
                        <p className="EndBanPhase-round">3</p>
                    </div>
                    <div className="EndBanPhase-enemyTeam">
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
                    <h2 className="RankedStart-title">{side ? "ATTACKER" : "DEFENDER"}</h2>
                    <h1 className="RankedStart-type">ROUND 1</h1>
                </div>
            </div>
        </div>
    )
}

export default EndBanPhase