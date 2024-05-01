import React, { useState } from "react";
import noEvent from "./sound-effects/noEvent.mp3";
import yesEvent from "./sound-effects/yesEvent.mp3";

export default function PlayedCardButton({ setEventTriggered, setEventType }) {
  //generate a number between 0 to 100
  function randomNumberGenerator() {
    return Math.floor(Math.random() * 101);
  }

  //select a random event type
  function randomEventSelect() {
    const events = ["Luck of the Draw", "Swapparoo"];
    const selectedEvent = events[Math.floor(Math.random() * events.length)];
    setEventType(selectedEvent);
  }

  function handleClick() {
    const randomNumber = randomNumberGenerator();

    if (randomNumber <= 22) {
      playYesEvent();
      setEventTriggered(true);
      randomEventSelect();
    } else {
      playNoEvent();
    }
  }

  const [noEventAudio] = useState(new Audio(noEvent));
  const [yesEventAudio] = useState(new Audio(yesEvent));
  const playNoEvent = () => {
    noEventAudio.play();
  };
  const playYesEvent = () => {
    yesEventAudio.play();
  };

  return (
    <>
      <div className="row-start-5 row-span-3 col-start-3 col-span-8 ">
        <button
          className="playedCardButton active:bg-customYellowActive"
          onClick={handleClick}
        >
          Play Card
        </button>
      </div>
    </>
  );
}
