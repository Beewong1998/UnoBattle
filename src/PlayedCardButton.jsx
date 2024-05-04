import React, { useState } from "react";
import noEvent from "./sound-effects/noEvent.mp3";
import yesEvent from "./sound-effects/yesEvent.mp3";
import { pulsar } from "ldrs";
import GameRound from "./GameRound";

pulsar.register();

export default function PlayedCardButton({
  setEventTriggered,
  setEventType,
  isGlobalMuted,
}) {
  const [isLoading, setIsLoading] = useState(false);

  //generate a number between 0 to 100
  function randomNumberGenerator() {
    return Math.floor(Math.random() * 101);
  }

  //select a random event type
  function randomEventSelect() {
    const events = [
      "Luck of the Draw",
      "Swapparoo",
      "Trade and Bargain",
      "Wormhole",
      "Shade Shuffle",
    ];
    const selectedEvent = events[Math.floor(Math.random() * events.length)];
    setEventType(selectedEvent);
  }

  function handleClick() {
    const randomNumber = randomNumberGenerator();

    if (randomNumber <= 22) {
      setIsLoading(false);
      playYesEvent();
      setEventTriggered(true);
      randomEventSelect();
    } else {
      setIsLoading(true);
      setTimeout(() => {
        playNoEvent();
      }, 100);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  const [noEventAudio] = useState(new Audio(noEvent));
  const [yesEventAudio] = useState(new Audio(yesEvent));

  const playNoEvent = () => {
    if (!isGlobalMuted) {
      // Check if not globally muted
      noEventAudio.play();
    }
  };

  const playYesEvent = () => {
    if (!isGlobalMuted) {
      // Check if not globally muted
      yesEventAudio.play();
    }
  };

  return (
    <>
      <div className="row-start-5 row-span-3 col-start-3 col-span-8 ">
        <button
          className={`playedCardButton active:bg-customYellowActive`}
          onClick={handleClick}
          disabled={isLoading}
        >
          {!isLoading ? (
            "Play Card"
          ) : (
            <l-pulsar size="40" speed="1.75" color="black"></l-pulsar>
          )}
        </button>
      </div>
    </>
  );
}
