import { useEffect, useState } from "react";
import "./SiegeOppBan.scss";
import data from "../assets/data/OperatorData.json";

const SiegeOppBan = ({ startTimer, timerDone, oppsBans }) => {
  const [oppData, SetoppData] = useState(data);
  const [pickedOpp, SetpickedOpp] = useState(null);
  const [startTeam, setStartTeam] = useState(Math.random() < 0.5);
  const [banRound, setBanRound] = useState({
    round: null,
    active: false,
    overlay: true,
    teamSide: startTeam,
  });

  const [bans, setBans] = useState({
    BannedOpps: [null, "Buck", "Rook", "Doc"],
    BannedBanner: [false, false, false, false],
    BannedScreen: [false, false, ""],
  });

  const [banPhase, setBanPhase] = useState({
    over: false,
    time: 1000,
  });

  const BannedOppsBanner = [
    {
      id: 1,
      svgPath:
        "M8.32,19.16l-5.54,5.54H2V28h3.31v-0.79l5.54-5.54H8.32V19.16z M25.2,2L10.29,17.18L8.5,15.4l-0.94,0.94l1.87,1.87v2.36h2.36l1.87,1.87l0.94-0.94l-1.78-1.78L28,4.8V2H25.2z M21.68,19.16v2.52h-2.52l5.54,5.54V28H28v-3.31h-0.78L21.68,19.16z M14.6,11.98L4.8,2H2v2.8l9.98,9.8L14.6,11.98z M20.57,18.21l1.87-1.87L21.5,15.4l-1.78,1.78l-1.67-1.71l-2.56,2.56l1.7,1.67L15.4,21.5l0.94,0.94l1.87-1.87h2.36V18.21z",
    },
    {
      id: 2,
      svgPath:
        "M8.32,19.16l-5.54,5.54H2V28h3.31v-0.79l5.54-5.54H8.32V19.16z M25.2,2L10.29,17.18L8.5,15.4l-0.94,0.94l1.87,1.87v2.36h2.36l1.87,1.87l0.94-0.94l-1.78-1.78L28,4.8V2H25.2z M21.68,19.16v2.52h-2.52l5.54,5.54V28H28v-3.31h-0.78L21.68,19.16z M14.6,11.98L4.8,2H2v2.8l9.98,9.8L14.6,11.98z M20.57,18.21l1.87-1.87L21.5,15.4l-1.78,1.78l-1.67-1.71l-2.56,2.56l1.7,1.67L15.4,21.5l0.94,0.94l1.87-1.87h2.36V18.21z",
    },
    {
      id: 3,
      svgPath:
        "M19.27,9.74l-4.25,2.17L10.73,9.7L8.15,28h13.7L19.27,9.74z M21.23,7.01V2h-2.88v1.73h-1.96V2h-2.78v1.73h-1.96V2H8.77v4.96l6.25,3.51L21.23,7.01z",
    },
    {
      id: 4,
      svgPath:
        "M19.27,9.74l-4.25,2.17L10.73,9.7L8.15,28h13.7L19.27,9.74z M21.23,7.01V2h-2.88v1.73h-1.96V2h-2.78v1.73h-1.96V2H8.77v4.96l6.25,3.51L21.23,7.01z",
    },
  ];

  useEffect(() => {
    if (timerDone === true) {
      setBanRound({
        ...banRound,
        overlay: false,
      });
      setBans({
        ...bans,
        BannedScreen: [
          true,
          bans.BannedScreen[1],
          bans.BannedOpps[banRound.round],
        ],
      });
      setTimeout(() => {
        setBans((prevBans) => {
          const updatedBannedBanner = [...prevBans.BannedBanner];
          updatedBannedBanner[banRound.round] = true;
          return {
            ...prevBans,
            BannedBanner: updatedBannedBanner,
          };
        });

        if (banRound.round < 3) {
          console.log(banRound.round);
          if (banRound.round == 0 || banRound.round == 2) {
            SetpickedOpp(null);
            setBanRound({
              ...banRound,
              round: banRound.round + 1,
              teamSide: !banRound.teamSide,
              overlay: true,
            });
            startTimer(banPhase.time);
          } else {
            SetpickedOpp(null);
            setBanRound({
              ...banRound,
              round: banRound.round + 1,
              teamSide: banRound.teamSide,
              overlay: true,
            });
            startTimer(banPhase.time);
          }
        } else {
          setBanRound({
            ...banRound,
            round: null,
            active: false,
          });
          setBanPhase({
            over: true,
          });
          console.log("done!");
        }
      }, 2000);
    } else {
      if (banRound.round === null) {
        setTimeout(() => {
          setBanRound({
            ...banRound,
            round: 0,
            active: true,
            teamSide: banRound.teamSide,
            overlay: true,
          });
          startTimer(banPhase.time);
        }, 2000);
      }
    }
  }, [timerDone]);

  useEffect(() => {
    if (banRound.active === true) {
      setTimeout(() => {
        setBans((prevBans, prev) => ({
          ...prevBans,
          BannedScreen: [false, banRound.teamSide, prevBans.BannedScreen[2]],
        }));
      }, 1000);
    }
  }, [banRound.teamSide, banRound.round]);

  return (
    <div className="SiegeOppBans">
      <div className="broder-left"></div>
      <div className="broder-right"></div>
      <div className="fog"></div>
      <div className="container">
        <div className="banDisplay">
          <div className="banbox">
            {BannedOppsBanner.map((ban, index) => (
              <div
                key={ban.id}
                className={`box ${
                  index === 1 || index === 2
                    ? !startTeam
                      ? "blue"
                      : "red"
                    : startTeam
                    ? "blue"
                    : "red"
                } ${banRound.round == index ? "active" : ""} `}
              >
                <div
                  className="timer"
                  style={{
                    transition: `height ${banPhase.time}s linear`,
                  }}
                ></div>
                {bans.BannedBanner[index] ? (
                  <div className="banicon-con">
                    <img
                      className="oppbanIcon"
                      src={
                        oppData.find(
                          (operator) => operator.name === bans.BannedOpps[index]
                        )?.icon
                      }
                      alt="img"
                    />
                    <img
                      className="banIcon"
                      src="0-8392_white-no-symbol-clip-art-at-clipart-library.png"
                      alt="banned"
                    />
                  </div>
                ) : null}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <path fill="#24262a" d={ban.svgPath} />
                </svg>
              </div>
            ))}
          </div>
        </div>
        {banRound.active ? (
          banRound.teamSide ? (
            <div className={`blueteam ${banRound.overlay ? "active" : ""} `}>
              <img className="back" src="Untitled-1.jpg" alt="back" />
              <div className="blueteam-left"></div>
              <div className="blueteam-right"></div>
              <div className="blueteam-fog"></div>
              <div className="thepickareia">
                <h1>
                  <span>YOUR TEAM </span> BANNING
                </h1>
                <div className="TheOpps">
                  {Array.from({ length: 49 }).map((_, index) => {
                    const filteredData = oppData.filter((theStuff) => {
                      return banRound.round < 2
                        ? theStuff.side === "ATTACKER"
                        : theStuff.side === "DEFENDER";
                    });

                    const theStuff = filteredData[index] || {
                      icon: "",
                      name: "",
                    };

                    return (
                      <div className="Aopp" key={index}>
                        {theStuff.icon ? (
                          <div
                            className="oppbox"
                            onMouseEnter={() => SetpickedOpp(theStuff)}
                            onClick={() =>
                              setBans((prevBans) => {
                                console.log("Previous Bans:", prevBans);
                                console.log("Clicked Operator:", theStuff.name);
                                if (prevBans.BannedOpps[1] === theStuff.name)
                                  return prevBans;

                                const updatedBans = {
                                  ...prevBans,
                                  BannedOpps: prevBans.BannedOpps.map(
                                    (opp, i) =>
                                      i === banRound.round ? theStuff.name : opp
                                  ),
                                };

                                console.log("Updated Bans:", updatedBans);
                                return updatedBans;
                              })
                            }
                          >
                            {bans.BannedOpps[banRound.round] ===
                            theStuff.name ? (
                              <div className="clicked">1</div>
                            ) : null}

                            <img
                              className="opimg"
                              src={theStuff.icon}
                              alt={theStuff.name}
                            />
                            <p>{theStuff.name}</p>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="oppinfo">
                {pickedOpp ? (
                  <>
                    <img
                      className="opp-BioImg"
                      src={pickedOpp.BioImg}
                      alt={pickedOpp.name}
                    />
                    <div className="oppinfobox">
                      <div className="oppinfobox-top">
                        <img
                          className="opp-name"
                          src={pickedOpp.icon}
                          alt={pickedOpp.name}
                        />
                        <div className="oppinfobox-topinfobox">
                          <h1 className="opp-name">{pickedOpp.name}</h1>
                          <p className="opp-squad">{pickedOpp.squad}</p>
                        </div>
                      </div>
                      <div className="oppinfobox-topmid">
                        <div className="oppinfobox-specialty-one">
                          <h3 className="specialty-type-title">SPECIALTIES</h3>
                          {pickedOpp.specialty.type.map((type, index) => (
                            <p key={index}>{type}</p>
                          ))}
                        </div>
                        <div className="oppinfobox-specialty-two">
                          <div className="cullum">
                            <h4 className="specialty-title">HEALTH</h4>
                            <div className="opp-specialty-HEALTH">
                              {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                  key={index}
                                  className={`dot ${
                                    index < pickedOpp.specialty.HEALTH
                                      ? "true"
                                      : ""
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="cullum">
                            <h4 className="specialty-title">SPEED</h4>
                            <div className="opp-specialty-HEALTH">
                              {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                  key={index}
                                  className={`dot ${
                                    index < pickedOpp.specialty.SPEED
                                      ? "true"
                                      : ""
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="cullum">
                            <h4 className="specialty-title">DIFFICULTY</h4>
                            <div className="opp-specialty-HEALTH">
                              {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                  key={index}
                                  className={`dot ${
                                    index < pickedOpp.specialty.DIFFICULTY
                                      ? "true"
                                      : ""
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="oppinfobox-mid">
                        <div>
                          <h4>{Object.keys(pickedOpp.loadout.ABILITY)[0]}</h4>
                          <img
                            src={
                              pickedOpp.loadout.ABILITY[
                                Object.keys(pickedOpp.loadout.ABILITY)[0]
                              ].img
                            }
                            alt={Object.keys(pickedOpp.loadout.ABILITY)[0]}
                          />
                        </div>
                        <div className="opp-extra-text">
                          {pickedOpp.extra.text}
                        </div>
                      </div>
                      <div className="oppinfobox-bottom">
                        <div className="opp-PRIMARY-box">
                          {Object.entries(pickedOpp.loadout.PRIMARY).map(
                            ([key, PRIMARY], index) => (
                              <div key={index} className="opp-PRIMARY">
                                <p>{PRIMARY.type}</p>
                                <h5>{PRIMARY.name}</h5>
                                <img src={PRIMARY.img} alt={PRIMARY.name} />
                              </div>
                            )
                          )}
                        </div>
                        <div className="opp-SECONDARY-box">
                          {Object.entries(pickedOpp.loadout.SECONDARY).map(
                            ([key, SECONDARY], index) => (
                              <div key={index} className="opp-SECONDARY">
                                <p>{SECONDARY.type}</p>
                                <h5>{SECONDARY.name}</h5>
                                <img src={SECONDARY.img} alt={SECONDARY.name} />
                              </div>
                            )
                          )}
                        </div>
                        <div className="opp-GADGET-box">
                          {Object.entries(pickedOpp.loadout.GADGET).map(
                            ([key, GADGET], index) => (
                              <div key={index} className="opp-GADGET">
                                <p>GADGET</p>
                                <h5>{key}</h5>
                                <img src={GADGET.img} alt={key} />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Hover over an opponent to see details</p>
                )}
              </div>
            </div>
          ) : (
            <div className={`redteam ${banRound.overlay ? "active" : ""} `}>
              <img className="back" src="Untitled-1.jpg" alt="back" />
              <div className="redteam-left"></div>
              <div className="redteam-right"></div>
              <div className="redteam-fog"></div>
            </div>
          )
        ) : null}
        {bans.BannedScreen[0] ? (
          <div className={`showBan ${bans.BannedScreen[1] ? "blue" : "red"}`}>
            <img src="Untitled-1.jpg" alt="back" />
            <div className="thcon">
              <div className="showBanbroder-left"></div>
              <div className="infobox">
                <img
                  src={
                    oppData.find(
                      (operator) => operator.name === bans.BannedScreen[2]
                    )?.BioImg
                  }
                  alt={bans.BannedScreen[2]}
                />
                <div className="text">
                  <h2>
                    <span></span>
                    BANNED
                  </h2>
                  <h1>{bans.BannedScreen[2]}</h1>
                </div>
              </div>
              <div className="showBanbroder-right"></div>
            </div>
          </div>
        ) : null}
        {banPhase.over && (
          <div className="showallbans">
            <div className="broder-left"></div>
            <div className="broder-right"></div>
            <div className="fog"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiegeOppBan;
