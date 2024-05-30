import React, { useState, useEffect } from "react";
import "ldrs/ring";
import { hourglass } from "ldrs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import styles from "./css/EndGameButton.module.css";
import ConfettiExplosion from "react-confetti-explosion";
import Scoreboard from "./Scoreboard";
import gameEndSound from "./sound-effects/gameEndSound.mp3";
import { CSSTransition } from "react-transition-group";

hourglass.register();

export default function EndGameButton({
  playerNames,
  scores,
  isSoundEffectMuted,
  isGameEnd,
  setIsGameEnd,
  gameRound,
}) {
  const [showEvent, setShowEvent] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showScoreboard, setShowScoreboard] = useState(false);

  const playerScores = playerNames.map((player, index) => ({
    name: player,
    score: scores[index],
  }));

  const [first, second, third, fourth, fifth] = playerScores.sort(
    (a, b) => a.score - b.score
  );

  const [drumRoll] = useState(new Audio(gameEndSound));
  const playDrumRoll = () => {
    if (!isSoundEffectMuted) {
      // Check if not globally muted
      drumRoll.play();
    }
  };

  return (
    <>
      <CSSTransition
        in={showScoreboard}
        timeout={500}
        classNames={{
          enter: styles["modal-enter"],
          exit: styles["modal-exit"],
        }}
        unmountOnExit
      >
        <Scoreboard playerScores={playerScores} />
      </CSSTransition>

      {!isGameEnd && gameRound > 1 && (
        <button
          className={`endGameButton row-start-9 row-span-1 col-start-5 col-span-4 bg-customGreen active:bg-customGreenActive text-black font-medium rounded-2xl mt-10 mx-4 shadow-md `}
          onClick={() => {
            setIsGameEnd(true);
            setButtonDisabled(true);
            playDrumRoll();
            setTimeout(() => setShowEvent(true), 500);
            setTimeout(() => {
              setIsExploding(true);
              setButtonDisabled(false);
            }, 5700);
          }}
        >
          End Game
        </button>
      )}
      <CSSTransition
        in={isGameEnd}
        timeout={500}
        classNames={{
          enter: styles["modal-enter"],
          exit: styles["modal-exit"],
        }}
        unmountOnExit
      >
        <>
          <div
            className={`row-start-2 row-span-8 col-start-2 col-span-10 z-40`}
          >
            <div className="w-2 mx-auto">
              {isExploding && (
                <ConfettiExplosion
                  particleCount={300}
                  duration={7000}
                  zIndex={999}
                />
              )}
            </div>
            <div className="endGameScreen w-full lg:w-5/6 lg:mx-auto h-full bg-customRed flex flex-col">
              <div className="standings p-2 bg-customRed">
                <div
                  className={`${styles.thirdPlace} ${
                    showEvent ? styles.show : ""
                  } bg-customLightBlue mb-2 rounded-md font-medium`}
                >
                  In third place...
                </div>
                <div
                  className={`${styles.thirdPlaceReveal} ${
                    showEvent ? styles.show : ""
                  } bg-customBronze rounded-md py-2 text-lg name`}
                >
                  {third ? third.name : "N/A"}
                </div>
              </div>

              <div className="standings p-2 bg-customRed">
                <div
                  className={`${styles.secondPlace} ${
                    showEvent ? styles.show : ""
                  } bg-customLightBlue mb-2 rounded-md font-medium`}
                >
                  The runner up...
                </div>
                <div
                  className={`${styles.secondPlaceReveal} ${
                    showEvent ? styles.show : ""
                  } bg-customSilver rounded-md py-2 text-lg name`}
                >
                  {" "}
                  {second.name}
                </div>
              </div>
              <div className="standings p-2 bg-customRed">
                <div
                  className={`${styles.firstPlace} ${
                    showEvent ? styles.show : ""
                  } bg-customLightBlue mb-2 rounded-md font-medium`}
                >
                  And the winner is...
                </div>
                <div
                  className={`${styles.firstPlaceReveal} ${
                    showEvent ? styles.show : ""
                  } bg-customYellow rounded-md py-2 text-lg name`}
                >
                  {" "}
                  {first.name}
                </div>
              </div>
              <div
                className="w-full h-3/4 bg-customRed flex flex-row items-end justify-around podium"
                id="podium-container"
              >
                <div
                  className={`${styles.secondPlaceReveal} ${
                    showEvent ? styles.show : ""
                  } w-16`}
                  id="second-place"
                >
                  <FontAwesomeIcon
                    size="xl"
                    icon={faMedal}
                    flip
                    style={{ color: "#c0c0c0" }}
                  />
                  <div className="font-medium my-2 text-ellipsis overflow-hidden ...">
                    {second.name}
                  </div>
                  <div className="h-24 bg-customSilver pt-1 text-ellipsis overflow-hidden ...">
                    {second.score} pts
                  </div>
                </div>
                <div
                  className={`${styles.firstPlaceReveal} ${
                    showEvent ? styles.show : ""
                  } w-16`}
                  id="first-place"
                >
                  <FontAwesomeIcon
                    size="2xl"
                    icon={faMedal}
                    bounce
                    style={{ color: "#f5d867" }}
                  />

                  <div className="font-medium my-2 text-ellipsis overflow-hidden ...">
                    {first.name}
                  </div>
                  <div className="h-36 bg-customYellow pt-1 text-ellipsis overflow-hidden ...">
                    {first.score} pts
                  </div>
                </div>
                <div
                  className={`${styles.thirdPlaceReveal} ${
                    showEvent ? styles.show : ""
                  } w-16`}
                  id="third-place"
                >
                  <FontAwesomeIcon
                    size="lg"
                    icon={faMedal}
                    beat
                    style={{ color: "#cc6600" }}
                  />

                  <div className="font-medium my-2 text-ellipsis overflow-hidden ...">
                    {!third ? "N/A" : third.name}
                  </div>
                  <div className="h-14 bg-customBronze pt-1 text-ellipsis overflow-hidden ...">
                    {!third ? "" : third.score + " pts"}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-5/6 lg:mx-auto h-8 bg-customLightBlue"></div>
            <div
              className={`backToGame text-black mt-10 h-6 w-full lg:w-5/6 lg:mx-auto flex flex-row justify-around px-2 ${
                styles.buttonsReveal
              } ${showEvent ? styles.show : ""} `}
            >
              {!showScoreboard ? (
                <button
                  className="bg-customYellow w-2/6 mr-3 rounded-2xl shadow-md active:bg-customYellowActive"
                  disabled={buttonDisabled}
                  onClick={() => {
                    drumRoll.pause();
                    drumRoll.currentTime = 0;
                    setIsGameEnd(false);
                    setShowEvent(false);
                    setIsExploding(false);
                  }}
                >
                  {" "}
                  Back
                </button>
              ) : (
                <button
                  className="bg-customYellow w-2/6 mr-3 rounded-2xl shadow-md active:bg-customYellowActive"
                  disabled={buttonDisabled}
                  onClick={() => {
                    setShowScoreboard(false);
                  }}
                >
                  {" "}
                  Back
                </button>
              )}

              <button
                disabled={buttonDisabled}
                className="bg-customGreen active:bg-customGreenActive w-2/6  rounded-2xl shadow-md "
                onClick={() => window.location.reload()}
              >
                New Game
              </button>
              <button
                disabled={buttonDisabled}
                className="bg-customYellow w-2/6 rounded-2xl ml-3 shadow-md active:bg-customYellowActive"
                onClick={() => {
                  setShowScoreboard((prevState) => !prevState);
                }}
              >
                Scoreboard
              </button>
            </div>
          </div>
        </>
      </CSSTransition>
    </>
  );
}
