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
          type="number"
          onChange={(event) => handleRoundScoreChange(index, event)}
        />
      </td>
    </tr>
  ));

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Total Score</th>
            <th>Round Score</th>
            <th onClick={() => setWinnerDecided(false)}>X</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
