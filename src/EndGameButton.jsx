import React, { useState } from "react";
import "ldrs/ring";
import { hourglass } from "ldrs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

hourglass.register();

export default function EndGameButton({
  playerNames,
  scores,
  isGlobalMuted,
  isGameEnd,
  setIsGameEnd,
  gameRound,
}) {
  const playerScores = playerNames.map((player, index) => ({
    name: player,
    score: scores[index],
  }));

  const [first, second, third, fourth, fifth] = playerScores.sort(
    (a, b) => a.score - b.score
  );

  return (
    <>
      {!isGameEnd && gameRound > 1 ? (
        <button
          onClick={() => {
            console.log(playerScores);
            setIsGameEnd(true);
          }}
        >
          End Game
        </button>
      ) : isGameEnd ? (
        <>
          <div
            className={`row-start-2 row-span-8 col-start-2 col-span-10 z-50`}
          >
            <div className="w-full h-full bg-customLightBlue flex flex-col justify-between">
              <div className="p-5 h-full bg-customRed">
                <div className="bg-customLightBlue mb-2 rounded-md">
                  The winner is...
                </div>
                <div className="bg-customYellow rounded-md"> {first.name}</div>
              </div>
              <div
                className="w-full h-3/4 bg-customRed flex flex-row items-end justify-around"
                id="podium-container"
              >
                <div className="w-16" id="second-place">
                  <FontAwesomeIcon
                    size="xl"
                    icon={faMedal}
                    style={{ color: "#c0c0c0" }}
                  />
                  <div className="font-medium my-2 text-ellipsis overflow-hidden ...">
                    {second.name}
                  </div>
                  <div className="h-24 bg-customSilver pt-1 text-ellipsis overflow-hidden ...">
                    {second.score} pts
                  </div>
                </div>
                <div className="w-16" id="first-place">
                  <FontAwesomeIcon
                    size="2xl"
                    icon={faMedal}
                    style={{ color: "#f5d867" }}
                  />

                  <div className="font-medium my-2 text-ellipsis overflow-hidden ...">
                    {first.name}
                  </div>
                  <div className="h-36 bg-customYellow pt-1 text-ellipsis overflow-hidden ...">
                    {first.score} pts
                  </div>
                </div>
                <div className="w-16" id="third-place">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faMedal}
                    style={{ color: "#cc6600" }}
                  />

                  <div className="font-medium my-2 text-ellipsis overflow-hidden ...">
                    {!third ? "N/A" : third.name}
                  </div>
                  <div className="h-14 bg-customBronze pt-1 text-ellipsis overflow-hidden ...">
                    {third.score} pts
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-row w-full text-left mt-2">
                {fourth && (
                  <>
                    <div className="w-full pl-2">
                      4th: {fourth.name} ({fourth.score} pts)
                    </div>
                    {!fifth ? (
                      <div className="w-full"></div>
                    ) : (
                      <div className="w-full pl-2">
                        5th: {fifth.name} ({fifth.score} pts)
                      </div>
                    )}
                  </>
                )}
              </div> */}
            </div>
            <div className="w-full h-8 bg-customLightBlue"></div>
            <button
              className="mt-3"
              onClick={() => {
                setIsGameEnd(false);
              }}
            >
              Back
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
