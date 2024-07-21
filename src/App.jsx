import logo from "./logo.svg";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import React, { useState } from "react";
import PlayerNumberInput from "./PlayerNumberInput";
import PlayedCardButton from "./PlayedCardButton";
import EventArea from "./EventArea";
import WinnerButton from "./WinnerButton";
import ScoreTracking from "./ScoreTracking";
import ResetButton from "./ResetButton";
import PatchNotes from "./PatchNotes";
import GameRound from "./GameRound";
import EndGameButton from "./EndGameButton";
import Environment from "./Environment";
import Settings from "./Settings";
import { CSSTransition } from "react-transition-group";
import Tutorial from "./Tutorial";

function App() {
  //checks if number of players have been confirmed
  const [inputtedPlayers, setInputtedPlayers] = useState(false);
  //checks if player names have been confirmed
  const [inputtedPlayerNames, setInputtedPlayerNames] = useState(false);

  //state for the number of players
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  //state for the player names
  const [playerNames, setPlayerNames] = useState([]);

  //state for the game round
  const [gameRound, setGameRound] = useState(1);

  //state to check if event has been triggered
  const [eventTriggered, setEventTriggered] = useState(false);
  //state to check which event has been triggered
  const [eventType, setEventType] = useState(null);

  //state to check if someone has won
  const [winnerDecided, setWinnerDecided] = useState(false);

  //state to keep track of scores
  const [scores, setScores] = useState(null);

  //states to keep track of mute
  const [isSoundEffectMuted, setIsSoundEffectMuted] = useState(false);
  const [isAnnouncerMuted, setIsAnnouncerMuted] = useState(false);

  //state to keep track of text to speech voice
  const [voice, setVoice] = useState(() => {
    const voices = window.speechSynthesis.getVoices();
    return voices[0];
  });
  const [language, setLanguage] = useState("");

  //state to keep track of game end
  const [isGameEnd, setIsGameEnd] = useState(false);

  //state to keep track of tutorial
  const [tutorialOpen, setTutorialOpen] = useState(true);

  //state to keep track of settings
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  //state to keep track of reset button
  const [confirmation, setConfirmation] = useState(false);

  //state to keep track of the environment
  const [environment, setEnvironment] = useState();

  //state to keep track of environment information
  const [environmentInformation, setEnvironmentInformation] = useState(false);

  //state to keep track of events generated
  const [header, setHeader] = useState();
  const [playersInvolved, setPlayersInvolved] = useState();
  const [instructions, setInstructions] = useState();
  const [playContinue, setPlayContinue] = useState();

  function handleChange(e) {
    setNumberOfPlayers(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setInputtedPlayers(true);
  }
  function handlePlayerNameSubmit(e) {
    e.preventDefault();
    setInputtedPlayerNames(true);
  }

  //function to save the different player names into an array
  function handlePlayerNameChange(e, index) {
    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[index] = e.target.value;
    setPlayerNames(updatedPlayerNames);
    setScores(() => Array(playerNames.length + 1).fill(0));
  }

  //function for the mute toggle
  const toggleSoundEffectMute = () => {
    setIsSoundEffectMuted(!isSoundEffectMuted);
  };

  const closeEverything = () => {
    if (winnerDecided) {
      setWinnerDecided(false);
    }

    if (isSettingOpen) {
      setIsSettingOpen(false);
      setRotate(!rotate);
    }

    if (confirmation) {
      setConfirmation(false);
    }

    if (environmentInformation) {
      setEnvironmentInformation(false);
    }
  };

  return (
    <div
      className="App bg-customDeepBlue grid grid-cols-12 grid-rows-12 w-screen h-screen grid-flow-dense overflow-scroll"
      onClick={closeEverything}
    >
      {!inputtedPlayers && (
        <>
          <div id="logo">
            <img src="./logo512.png" className="w-40" alt="Robeeto Logo" />
            <img src="./title.png" className="w-60" alt="Robeeto Title Text" />
          </div>
          <PlayerNumberInput
            numberOfPlayers={numberOfPlayers}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </>
      )}
      {!inputtedPlayerNames && inputtedPlayers && (
        // Render elements based on the numberOfPlayers state

        <form
          className="w-full row-start-2 row-span-6 col-start-3 col-span-8 "
          onSubmit={handlePlayerNameSubmit}
        >
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
            type="button"
            className="button bg-customYellow active:bg-customYellowActive font-bold py-3 px-6 mt-4 rounded mr-3"
          >
            Back
          </button>
          <button
            className="button bg-customRed active:bg-customRedActive py-3 px-6 mt-4 rounded ml-3"
            type="submit"
          >
            Next
          </button>
        </form>
      )}
      {inputtedPlayerNames && inputtedPlayers && tutorialOpen && (
        <Tutorial
          tutorialOpen={tutorialOpen}
          setTutorialOpen={setTutorialOpen}
        />
      )}
      {!eventTriggered && inputtedPlayerNames && (
        <>
          <GameRound gameRound={gameRound} />
          <PlayedCardButton
            playerNames={playerNames}
            setEventTriggered={setEventTriggered}
            eventType={eventType}
            setEventType={setEventType}
            setHeader={setHeader}
            setPlayersInvolved={setPlayersInvolved}
            setInstructions={setInstructions}
            setPlayContinue={setPlayContinue}
            isSoundEffectMuted={isSoundEffectMuted}
            numberOfPlayers={numberOfPlayers}
            setEnvironment={setEnvironment}
            environment={environment}
          />
          <Environment
            environment={environment}
            environmentInformation={environmentInformation}
            setEnvironmentInformation={setEnvironmentInformation}
          />
          <Settings
            isSoundEffectMuted={isSoundEffectMuted}
            isAnnouncerMuted={isAnnouncerMuted}
            isGameEnd={isGameEnd}
            toggleSoundEffectMute={toggleSoundEffectMute}
            setIsSoundEffectMuted={setIsSoundEffectMuted}
            setIsAnnouncerMuted={setIsAnnouncerMuted}
            voice={voice}
            setVoice={setVoice}
            setLanguage={setLanguage}
            setTutorialOpen={setTutorialOpen}
            isSettingOpen={isSettingOpen}
            setIsSettingOpen={setIsSettingOpen}
            rotate={rotate}
            setRotate={setRotate}
          />
          <EndGameButton
            playerNames={playerNames}
            scores={scores}
            isSoundEffectMuted={isSoundEffectMuted}
            isGameEnd={isGameEnd}
            setIsGameEnd={setIsGameEnd}
            gameRound={gameRound}
          />
        </>
      )}

      {eventTriggered && !winnerDecided && (
        <EventArea
          eventType={eventType}
          setEventType={setEventType}
          setEventTriggered={setEventTriggered}
          header={header}
          playersInvolved={playersInvolved}
          instructions={instructions}
          playContinue={playContinue}
          setEnvironment={setEnvironment}
          environment={environment}
          playerNames={playerNames}
          isSoundEffectMuted={isSoundEffectMuted}
          isAnnouncerMuted={isAnnouncerMuted}
          voice={voice}
          language={language}
        />
      )}

      {inputtedPlayerNames && !eventTriggered && !isGameEnd && (
        <>
          <WinnerButton
            winnerDecided={winnerDecided}
            setWinnerDecided={setWinnerDecided}
            isSoundEffectMuted={isSoundEffectMuted}
          />
          <PatchNotes />
        </>
      )}
      <CSSTransition
        in={winnerDecided}
        timeout={500}
        classNames={{
          enter: "modal-enter",
          exit: "modal-exit",
        }}
        unmountOnExit
      >
        <ScoreTracking
          playerNames={playerNames}
          setScores={setScores}
          scores={scores}
          setWinnerDecided={setWinnerDecided}
          setGameRound={setGameRound}
          isSoundEffectMuted={isSoundEffectMuted}
          setEnvironment={setEnvironment}
        />
      </CSSTransition>
      {inputtedPlayers && inputtedPlayerNames && !eventTriggered && (
        <>
          <ResetButton
            confirmation={confirmation}
            setConfirmation={setConfirmation}
          />
        </>
      )}
      <Analytics />
    </div>
  );
}

export default App;
