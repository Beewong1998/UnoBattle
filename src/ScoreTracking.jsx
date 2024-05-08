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
          className=" w-2/4 rounded-lg text-center"
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
        <table className="bg-customYellow border border-gray-400 w-full h-full rounded-lg">
          <thead>
            <tr>
              <th className="border border-customDeepBlue">Player</th>
              <th className="border border-customDeepBlue">Total Score</th>
              <th className="border-y border-customDeepBlue">Round Score</th>
              <th
                className="pr-2 border-y border-customDeepBlue"
                onClick={() => setWinnerDecided(false)}
              >
                X
              </th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        <button
          className="w-full bg-customGreen active:bg-customGreenActive text-black font-base  rounded-2xl mt-2 py-1 "
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
      </div>
    </>
  );
}
