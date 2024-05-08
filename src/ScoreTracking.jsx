import React, { useState } from "react";
import "ldrs/ring";
import { hourglass } from "ldrs";
import noEvent from "./sound-effects/noEvent.mp3";

hourglass.register();

export default function ScoreTracking({
  playerNames,
  setScores,
  scores,
  setWinnerDecided,
  setGameRound,
  isGlobalMuted,
}) {
  const [roundScores, setRoundScores] = useState(
    Array(playerNames.length).fill(0)
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleRoundScoreChange = (index, event) => {
    const newRoundScores = [...roundScores];
    newRoundScores[index] = parseInt(event.target.value) || 0;
    setRoundScores(newRoundScores);
  };
  const [noEventAudio] = useState(new Audio(noEvent));
  const playSubmit = () => {
    if (!isGlobalMuted) {
      // Check if not globally muted
      noEventAudio.play();
    }
  };
  const handleSubmit = () => {
    playSubmit();
    setIsSaving(true);
    const newScores = scores.map((score, index) => score + roundScores[index]);
    setScores(newScores);
    setRoundScores(Array(playerNames.length).fill(0)); // Reset round scores after submission

    setTimeout(() => {
      setGameRound((prev) => {
        return (prev += 1);
      });
      setWinnerDecided(false);
      setIsSaving(false);
    }, 2000);
  };

  // Render the table rows for each player
  const tableRows = playerNames.map((player, index) => (
    <tr className="text-lg" key={index}>
      <td className="border-x border-customDeepBlue">{player}</td>
      <td className="border-x border-customDeepBlue">{scores[index]}</td>
      <td>
        <input
          className=" w-3/4 rounded-lg text-center"
          type="number"
          onChange={(event) => handleRoundScoreChange(index, event)}
        />
      </td>
    </tr>
  ));

  return (
    <>
      <div
        className={`row-start-2 row-span-9 col-start-1 col-span-12 px-3 z-50`}
      >
        <table className="bg-customYellow  w-full h-5/6 rounded-lg">
          <thead>
            <tr>
              <th className="border border-customDeepBlue w-1/5">Player</th>
              <th className="border border-customDeepBlue w-1/5">
                Total Score
              </th>
              <th className="border-y border-customDeepBlue w-3/5">
                Round Score
              </th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        <table className="bg-customYellow  w-full h-1/6 rounded-lg">
          <tbody>
            <tr className="text-lg bg-customDeepBlue">
              <td className="w-2/5">
                {" "}
                <button
                  className="w-11/12 bg-customRed active:bg-customRedActive text-black font-base  rounded-2xl mt-2 py-1"
                  onClick={() => setWinnerDecided(false)}
                >
                  back
                </button>
              </td>

              <td className="w-3/5">
                <button
                  className="w-11/12 bg-customGreen active:bg-customGreenActive text-black font-base  rounded-2xl mt-2 py-1 "
                  onClick={handleSubmit}
                >
                  {!isSaving ? (
                    "Submit"
                  ) : (
                    <div className="w-full">
                      <l-hourglass
                        size="20"
                        bg-opacity="0.1"
                        speed="1"
                        color="black"
                      ></l-hourglass>
                    </div>
                  )}
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* <div className="flex flex-row justify-around">
          <button
            className="w-1/3  mr-2 bg-customRed active:bg-customRedActive text-black font-base  rounded-2xl mt-2 py-1 "
            onClick={() => setWinnerDecided(false)}
          >
            back
          </button>
          <button
            className="w-2/3  ml-2 bg-customGreen active:bg-customGreenActive text-black font-base  rounded-2xl mt-2 py-1 "
            onClick={handleSubmit}
          >
            {!isSaving ? (
              "Submit"
            ) : (
              <l-hourglass
                size="20"
                bg-opacity="0.1"
                speed="1"
                color="black"
              ></l-hourglass>
            )}
          </button>
        </div> */}
      </div>
    </>
  );
}
