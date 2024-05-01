import React, { useState } from "react";

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

    if (randomNumber < 20) {
      setEventTriggered(true);
      randomEventSelect();
    }
  }

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
