import React, { useState } from "react";
import "ldrs/ring";
import { hourglass } from "ldrs";

hourglass.register();

export default function ScoreTracking({
  playerNames,
  setScores,
  scores,
  setWinnerDecided,
  setGameRound,
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

  const handleSubmit = () => {
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
      <td>{player}</td>
      <td>{scores[index]}</td>
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
              <th>Player</th>
              <th>Total Score</th>
              <th>Round Score</th>
              <th className="pr-2" onClick={() => setWinnerDecided(false)}>
                X
              </th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        <button
          className="w-full bg-customGreen active:bg-customGreenActive text-black font-semibold  rounded-2xl mt-2 py-1 font-semibold"
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
