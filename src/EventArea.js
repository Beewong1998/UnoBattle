import React, { useState } from "react";

export default function EventArea({
  eventType,
  playerNames,
  setEventTriggered,
}) {
  function generateTwoUniqueRandomNumbers(array) {
    // Get the size of the array
    const arraySize = array.length;

    // Generate the first random number
    const randomNumber1 = Math.floor(Math.random() * arraySize);

    // Generate the second random number, ensuring it's different from the first one
    let randomNumber2;
    do {
      randomNumber2 = Math.floor(Math.random() * arraySize);
    } while (randomNumber2 === randomNumber1);

    // Return the two random numbers
    return [randomNumber1, randomNumber2];
  }
  const cardTypes = [
    "green",
    "red",
    "blue",
    "yellow",
    "special",
    "odd",
    "even",
    "Uno",
  ];
  let header = (
    <div>
      <h2>The event is {eventType}!</h2>
    </div>
  );

  let instructions;
  if (eventType.toLowerCase() == "luck of the draw") {
    instructions = (
      <>
        <p>
          The player doing the event is{" "}
          {playerNames[Math.floor(Math.random() * playerNames.length)]}
        </p>
        <p>
          The player must draw cards until they get a/n{" "}
          {cardTypes[Math.floor(Math.random() * cardTypes.length)]} card!
        </p>
      </>
    );
  } else if (eventType.toLowerCase() == "swapparoo") {
    const [randomNumber1, randomNumber2] =
      generateTwoUniqueRandomNumbers(playerNames);
    instructions = (
      <>
        <p>
          The players doing the event are {playerNames[randomNumber1]} and{" "}
          {playerNames[randomNumber2]}
        </p>
        <p>The players must swap their cards with each other!</p>
      </>
    );
  }

  return (
    <>
      {header}
      {instructions}
      <button onClick={() => setEventTriggered(false)}>Event Completed</button>
    </>
  );
}
