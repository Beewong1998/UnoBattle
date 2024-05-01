import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import PlayerNumberInput from "./PlayerNumberInput";
import PlayedCardButton from "./PlayedCardButton";
import EventArea from "./EventArea";
import WinnerButton from "./WinnerButton";
import ScoreTracking from "./ScoreTracking";
import ResetButton from "./ResetButton";

function App() {
  //checks if number of players have been confirmed
  const [inputtedPlayers, setInputtedPlayers] = useState(false);
  //checks if player names have been confirmed
  const [inputtedPlayerNames, setInputtedPlayerNames] = useState(false);

  //state for the number of players
  const [numberOfPlayers, setNumberOfPlayers] = useState(null);
  //state for the player names
  const [playerNames, setPlayerNames] = useState([]);

  //state to check if event has been triggered
  const [eventTriggered, setEventTriggered] = useState(false);
  //state to check which event has been triggered
  const [eventType, setEventType] = useState(null);

  //state to check if someone has won
  const [winnerDecided, setWinnerDecided] = useState(false);

  //state to keep track of scores
  const [scores, setScores] = useState(null);

  function handleChange(e) {
    setNumberOfPlayers(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setInputtedPlayers(true);
  }

  //function to save the different player names into an array
  function handlePlayerNameChange(e, index) {
    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[index] = e.target.value;
    setPlayerNames(updatedPlayerNames);
    setScores(() => Array(playerNames.length + 1).fill(0));
    console.log(playerNames);
  }

  console.log(scores);

  return (
    <div className="App bg-customDeepBlue grid grid-cols-12 grid-rows-12 w-screen h-screen grid-flow-dense">
      {!inputtedPlayers && (
        <PlayerNumberInput
          numberOfPlayers={numberOfPlayers}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {!inputtedPlayerNames && inputtedPlayers && (
        // Render elements based on the numberOfPlayers state
        <>
          <div className="w-full row-start-2 row-span-6 col-start-3 col-span-8">
            {Array.from({ length: numberOfPlayers }).map((_, index) => (
              <input
                className="game-input mb-1"
                required
                placeholder={`Enter the name of player ${index + 1}`}
                key={index}
                style={{ display: "block" }}
                onChange={(e) => handlePlayerNameChange(e, index)}
              />
            ))}

            <button
              onClick={() => setInputtedPlayers(false)}
              className="button bg-customYellow hover:bg-blue-700 font-bold py-3 px-6 mt-4 rounded mr-3"
            >
              Back
            </button>
            <button
              className="button bg-customRed hover:bg-blue-700 py-3 px-6 mt-4 rounded ml-3"
              onClick={() => setInputtedPlayerNames(true)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {!eventTriggered && inputtedPlayerNames && !winnerDecided && (
        <PlayedCardButton
          setEventTriggered={setEventTriggered}
          setEventType={setEventType}
        />
      )}

      {eventTriggered && !winnerDecided && (
        <EventArea
          eventType={eventType}
          playerNames={playerNames}
          setEventTriggered={setEventTriggered}
        />
      )}

      {inputtedPlayerNames && !eventTriggered && (
        <WinnerButton
          winnerDecided={winnerDecided}
          setWinnerDecided={setWinnerDecided}
        />
      )}
      {winnerDecided && (
        <ScoreTracking
          playerNames={playerNames}
          setScores={setScores}
          scores={scores}
          setWinnerDecided={setWinnerDecided}
        />
      )}
      {inputtedPlayers && inputtedPlayerNames && !eventTriggered && (
        <ResetButton />
      )}
    </div>
  );
}

export default App;
