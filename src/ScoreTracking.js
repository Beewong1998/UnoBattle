import React, { useState } from "react";

export default function ScoreTracking({
  playerNames,
  setScores,
  scores,
  setWinnerDecided,
}) {
  const [roundScores, setRoundScores] = useState(
    Array(playerNames.length).fill(0)
  );

  const handleRoundScoreChange = (index, event) => {
    const newRoundScores = [...roundScores];
    newRoundScores[index] = parseInt(event.target.value) || 0;
    setRoundScores(newRoundScores);
  };

  const handleSubmit = () => {
    const newScores = scores.map((score, index) => score + roundScores[index]);
    setScores(newScores);
    setRoundScores(Array(playerNames.length).fill(0)); // Reset round scores after submission
    setTimeout(() => {
      setWinnerDecided(false);
    }, 2000);
  };

  // Render the table rows for each player
  const tableRows = playerNames.map((player, index) => (
    <tr key={index}>
      <td>{player}</td>
      <td>{scores[index]}</td>
      <td>
        <input
          className="score-input w-3/4 rounded-lg text-center"
          type="number"
          onChange={(event) => handleRoundScoreChange(index, event)}
        />
      </td>
    </tr>
  ));

  return (
    <>
      <div className={`row-start-2 row-span-4 col-start-1 col-span-12 px-3`}>
        <table className="bg-customYellow border-collapse border border-gray-400 w-full rounded-lg">
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
          Submit
        </button>
      </div>
    </>
  );
}
