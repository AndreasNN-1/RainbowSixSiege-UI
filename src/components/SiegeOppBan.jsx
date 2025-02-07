import { useEffect, useState } from "react";
import "./SiegeOppBan.scss";
import data from "../assets/data/OperatorData.json";

const SiegeOppBan = ({ side, startTimer, timerDone, oppsBans }) => {
  const [oppData, SetoppData] = useState(data);
  const [pickedOpp, SetpickedOpp] = useState(null);
  const [startTeam, setStartTeam] = useState(!side);
  const [randomOpp, setRandomOpp] = useState(null);
  const [displaybanopp, setDisplaybanopp] = useState([]);
  const [banRound, setBanRound] = useState({
    round: null,
    active: false,
    overlay: true,
    teamSide: startTeam,
  });

  const [bans, setBans] = useState({
    BannedOpps: [null, null, null, null],
    BannedBanner: [false, false, false, false],
    BannedScreen: [false, false, ""],
  });

  const [banPhase, setBanPhase] = useState({
    showresolts: false,
    over: false,
    time: 10,
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
      if (banRound.teamSide === false) {
        setBans((prevBans) => {
          const filteredData = oppData.filter((theStuff) =>
            banRound.round < 2
              ? theStuff.side === "ATTACKER"
              : theStuff.side === "DEFENDER"
          );

          if (filteredData.length === 0) return prevBans;

          const availableOpps = filteredData.filter(
            (opp) => !prevBans.BannedOpps.includes(opp.name)
          );

          if (availableOpps.length === 0) {
            return prevBans;
          }

          const randomOpp =
            availableOpps[Math.floor(Math.random() * availableOpps.length)]
              .name;

          if (
            banRound.round < 0 ||
            banRound.round >= prevBans.BannedOpps.length
          ) {
            console.error("Invalid banRound index:", banRound.round);
            return prevBans;
          }

          const updatedBans = [...prevBans.BannedOpps];
          updatedBans[banRound.round] = randomOpp;

          return { ...prevBans, BannedOpps: updatedBans };
        });
      } else {
        setBans((prevBans) => {
          if (prevBans.BannedOpps[banRound.round] === null) {
            const updatedBans = [...prevBans.BannedOpps];
            updatedBans[banRound.round] = "noban";
            return { ...prevBans, BannedOpps: updatedBans };
          }
          return prevBans;
        });
      }
      setBanRound({
        ...banRound,
        overlay: false,
      });
      setBans((prevBans) => ({
        ...prevBans,
        BannedScreen: [
          true,
          prevBans.BannedScreen[1],
          prevBans.BannedOpps[banRound.round],
        ],
      }));

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
          setBanPhase({
            showresolts: true,
          });
          setBanRound({
            ...banRound,
            round: null,
            active: false,
          });
          setTimeout(() => {
            setBanPhase({
              showresolts: true,
              over: true,
            });
          }, 4000);
        }
      }, 3000);
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
        }, 3000);
      }
    }
  }, [timerDone]);

  useEffect(() => {
    if(banPhase.over)  {
      oppsBans(bans.BannedOpps);
    }
  }, [banPhase.over]);

  useEffect(() => {
    if (banRound.active === true) {
      setDisplaybanopp([...bans.BannedOpps]);
      setTimeout(() => {
        setBans((prevBans) => ({
          ...prevBans,
          BannedScreen: [false, banRound.teamSide, prevBans.BannedScreen[2]],
        }));
      }, 2000);
    }
  }, [banRound.teamSide, banRound.round]);

  useEffect(() => {
    if (banRound.overlay && !banRound.teamSide) {
      const filteredOpps = oppData.filter((theStuff) =>
        banRound.round < 2
          ? theStuff.side === "ATTACKER"
          : theStuff.side === "DEFENDER"
      );

      if (filteredOpps.length > 0) {
        const initialIndex = Math.floor(Math.random() * filteredOpps.length);
        setRandomOpp(filteredOpps[initialIndex].BioImg);

        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * filteredOpps.length);
          setRandomOpp(filteredOpps[randomIndex].BioImg);
        }, 3000);

        return () => clearInterval(interval);
      }
    } else {
      setRandomOpp(null);
    }
    return () => {};
  }, [banRound.overlay]);

  return (
    <div className="SiegeOppBans">
      <div className="broder-left"></div>
      <div className="broder-right"></div>
      <div className="fog"></div>
      <div className="introtitle">
        <div className="theh2">
          <h2>START OF</h2>
        </div>
        <div className="theh1">
          <h1>OPERATOR BAN PHASE</h1>
        </div>
      </div>
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
                  bans.BannedOpps[index] !== "noban" ? (
                    <div className="banicon-con">
                      <img
                        className="oppbanIcon"
                        src={
                          bans.BannedOpps[index] === "noban"
                            ? ""
                            : oppData.find(
                                (operator) =>
                                  operator.name === bans.BannedOpps[index]
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
                  ) : null
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

                    const isBanned = bans.BannedOpps.slice(
                      0,
                      banRound.round
                    ).includes(theStuff.name);

                    return (
                      <div
                        className={`Aopp ${isBanned ? "banned" : ""}`}
                        key={index}
                      >
                        {theStuff.icon ? (
                          <div
                            className="oppbox"
                            {...(!isBanned && {
                              onMouseEnter: () => SetpickedOpp(theStuff),
                            })}
                            {...(!isBanned && {
                              onClick: () =>
                                setBans((prevBans) => {
                                  if (
                                    prevBans.BannedOpps.includes(theStuff.name)
                                  )
                                    return prevBans;

                                  const updatedBans = {
                                    ...prevBans,
                                    BannedOpps: prevBans.BannedOpps.map(
                                      (opp, i) =>
                                        i === banRound.round
                                          ? theStuff.name
                                          : opp
                                    ),
                                  };
                                  return updatedBans;
                                }),
                            })}
                          >
                            {bans.BannedOpps[banRound.round] ===
                              theStuff.name || isBanned ? (
                              <div
                                className={`clicked ${
                                  isBanned ? "banned" : ""
                                }`}
                              >
                                {isBanned ? (
                                  <img
                                    className="banned-icon"
                                    src="0-8392_white-no-symbol-clip-art-at-clipart-library.png"
                                    alt="banned"
                                  />
                                ) : (
                                  1
                                )}
                              </div>
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
                <div className="nobanbox">
                  <div
                    className="noban"
                    onClick={() =>
                      setBans((prevBans) => {
                        const updatedBans = {
                          ...prevBans,
                          BannedOpps: prevBans.BannedOpps.map((opp, i) =>
                            i === banRound.round ? "noban" : opp
                          ),
                        };
                        return updatedBans;
                      })
                    }
                  >
                    <p className="nobantext">NO BAN</p>
                    {bans.BannedOpps[banRound.round] === "noban" ? (
                      <div className="nobanpick">
                        <img
                          className="nobanpick-icon"
                          src="0-8392_white-no-symbol-clip-art-at-clipart-library.png"
                          alt="banned"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="baninfo">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 128"
                    >
                      <path d="M 64 6 C 32 6 6 32 6 64 C 6 96 32 122 64 122 C 96 122 122 96 122 64 C 122 32 96 6 64 6 z M 64 12 C 92.7 12 116 35.3 116 64 C 116 92.7 92.7 116 64 116 C 35.3 116 12 92.7 12 64 C 12 35.3 35.3 12 64 12 z M 64 38 C 62.3 38 61 39.3 61 41 L 61 46 C 61 47.7 62.3 49 64 49 C 65.7 49 67 47.7 67 46 L 67 41 C 67 39.3 65.7 38 64 38 z M 64 58 C 62.3 58 61 59.3 61 61 L 61 87 C 61 88.7 62.3 90 64 90 C 65.7 90 67 88.7 67 87 L 67 61 C 67 59.3 65.7 58 64 58 z" />
                    </svg>
                    <p className="baninfotext">
                      Banned Operators will remain unavailable for both teams
                      during the entire match.
                    </p>
                  </div>
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
                          className="opp-img"
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
                          <ul>
                            {pickedOpp.specialty.type.map((type, index) => (
                              <li key={index}>{type}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="oppinfobox-specialty-two">
                          <div className="cullum">
                            <h4 className="specialty-title">HEALTH</h4>
                            <div className="opp-specialty">
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
                            <div className="opp-specialty">
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
                            <div className="opp-specialty">
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
                        <div className="opp-extra-icons">
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
                          {pickedOpp.extra.text.slice(0, 300)}.
                        </div>
                      </div>
                      <div className="oppinfobox-bottom">
                        <div className="opp-PRIMARY-box">
                          {Object.entries(pickedOpp.loadout.PRIMARY).map(
                            ([key, PRIMARY], index) => (
                              <div key={index} className="opp-set">
                                <p>{PRIMARY.type ? PRIMARY.type : "PRIMARY"}</p>
                                <h5>{PRIMARY.name}</h5>
                                <img src={PRIMARY.img} alt={PRIMARY.name} />
                              </div>
                            )
                          )}
                        </div>
                        <div className="opp-SECONDARY-box">
                          {Object.entries(pickedOpp.loadout.SECONDARY).map(
                            ([key, SECONDARY], index) => (
                              <div key={index} className="opp-set">
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
                              <div key={index} className="opp-set">
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
                ) : null}
              </div>
            </div>
          ) : (
            <div className={`redteam ${banRound.overlay ? "active" : ""} `}>
              <img className="back" src="Untitled-1.jpg" alt="back" />
              <div className="redteam-left"></div>
              <div className="redteam-right"></div>
              <div className="redteam-fog"></div>
              <div className="redteamtitle">
                <div className="redteamtitle2">
                  <h3>OPPONENTS</h3>
                </div>
                <div className="redteamtitleh1">
                  <h1>BANNING</h1>
                </div>
              </div>
              <div className="redshowbans">
                <div className="showallbans-con">
                  <div className="allopps">
                    {displaybanopp.map((opp, index) => (
                      <div key={index} className="opreater">
                        {opp !== null ? (
                          <>
                            <img
                              className="opreater-img"
                              src={
                                opp === "noban"
                                  ? "noban.png"
                                  : oppData.find(
                                      (operator) => operator.name === opp
                                    )?.BioImg
                              }
                              alt={opp}
                            />
                            <div className="oppbannerinfo">
                              <div
                                className={`oppbbanner ${
                                  startTeam === false
                                    ? index === 1 || index === 2
                                      ? "blue"
                                      : "red"
                                    : index === 1 || index === 2
                                    ? "red"
                                    : "blue"
                                }`}
                              >
                                <img
                                  className="banIcon"
                                  src="0-8392_white-no-symbol-clip-art-at-clipart-library.png"
                                  alt="banned"
                                />
                              </div>
                              <div className="oppname">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 30 30"
                                >
                                  <path
                                    fill="#24262a"
                                    d={
                                      oppData.find(
                                        (operator) => operator.name === opp
                                      )?.side === "ATTACKER"
                                        ? BannedOppsBanner[1].svgPath
                                        : BannedOppsBanner[2].svgPath
                                    }
                                  />
                                </svg>
                                <p className="theoppname">
                                  {opp === "noban" ? "no ban" : opp}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {banRound.round === index ? (
                              <div className="fade-opp">
                                <img src={randomOpp} alt="banned operator" />
                              </div>
                            ) : null}
                            <div className="noOppyet">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                              >
                                <path
                                  fill="#24262a"
                                  d={
                                    index < 2
                                      ? BannedOppsBanner[1].svgPath
                                      : BannedOppsBanner[2].svgPath
                                  }
                                />
                              </svg>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        ) : null}
        {bans.BannedScreen[0] ? (
          <div className={`showBan ${bans.BannedScreen[1] ? "blue" : "red"}`}>
            <img src="Untitled-1.jpg" alt="back" />
            <div className="thcon">
              <div className="showBanbroder-fog"></div>
              <div className="baninfobox">
                <img
                  className="operatorbanned"
                  src={
                    bans.BannedOpps[banRound.round] === "noban"
                      ? "noban.png"
                      : oppData.find(
                          (operator) => operator.name === bans.BannedScreen[2]
                        )?.BioImg
                  }
                  alt={bans.BannedScreen[2]}
                />
                <div className="text">
                  <h2>
                    <span>
                      {bans.BannedScreen[1] ? "YOUR TEAM " : "OPPONENTS "}
                    </span>
                    BANNED
                  </h2>
                  <h1>
                    {bans.BannedScreen[2] === "noban"
                      ? "NO BAN"
                      : bans.BannedScreen[2]}
                  </h1>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <path
                      fill="#24262a"
                      d={
                        oppData.find(
                          (operator) => operator.name === bans.BannedScreen[2]
                        )?.side === "ATTACKER"
                          ? BannedOppsBanner[1].svgPath
                          : BannedOppsBanner[2].svgPath
                      }
                    />
                  </svg>
                </div>
              </div>
              <div className="showBanbroder-left"></div>
              <div className="showBanbroder-right"></div>
            </div>
          </div>
        ) : null}
        {banPhase.showresolts && (
          <div className="showallbans">
            <img className="back" src="Untitled-1.jpg" alt="back" />
            <div className="broder-left"></div>
            <div className="broder-right"></div>
            <div className="fog"></div>
            <div className="showallbans-con">
              <div className="allopps">
                {bans.BannedOpps.map((opp, index) => (
                  <div key={index} className="opreater">
                    <img
                      className="opreater-img"
                      src={
                        opp === "noban"
                          ? "noban.png"
                          : oppData.find((operator) => operator.name === opp)
                              ?.BioImg
                      }
                      alt={opp}
                    />
                    <div className="oppbannerinfo">
                      <div
                        className={`oppbbanner ${
                          startTeam === false
                            ? index === 1 || index === 2
                              ? "blue"
                              : "red"
                            : index === 1 || index === 2
                            ? "red"
                            : "blue"
                        } `}
                      >
                        <img
                          className={`banIcon`}
                          src="0-8392_white-no-symbol-clip-art-at-clipart-library.png"
                          alt="banned"
                        />
                      </div>
                      <div className="oppname">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30"
                        >
                          <path
                            fill="#24262a"
                            d={
                              oppData.find((operator) => operator.name === opp)
                                ?.side === "ATTACKER"
                                ? BannedOppsBanner[1].svgPath
                                : BannedOppsBanner[2].svgPath
                            }
                          />
                        </svg>
                        <p className="theoppname">
                          {opp === "noban" ? "no ban" : opp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {banPhase.over && <div className="endbanphase"></div>}
    </div>
  );
};

export default SiegeOppBan;
