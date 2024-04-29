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

    if (randomNumber < 25) {
      setEventTriggered(true);
      randomEventSelect();
    }
  }

  return <button onClick={handleClick}>Played Card</button>;
}
