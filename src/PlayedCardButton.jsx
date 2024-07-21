import React, { useState, useEffect } from "react";
import noEvent from "./sound-effects/noEvent.mp3";
import yesEvent from "./sound-effects/yesEvent.mp3";
import { pulsar } from "ldrs";

pulsar.register();

export default function PlayedCardButton({
  setEventTriggered,
  eventType,
  setEventType,
  isSoundEffectMuted,
  numberOfPlayers,
  playerNames,
  setEnvironment,
  environment,
  setHeader,
  setPlayersInvolved,
  setInstructions,
  setPlayContinue,
}) {
  const [isLoading, setIsLoading] = useState(false);
  //state to keep of how many times an event has not happened in a row
  const [countDown, setCountDown] = useState(4);
  //state to keep of event happening so it does not happen twice in a row
  const [eventTriggeredCooldown, setEventTriggeredCooldown] = useState(true);

  useEffect(() => {
    if (eventType) {
      generateEventDetails();
      setEventTriggered(true);
    }
  }, [eventType]);

  //generate a number between 0 to 100
  function randomNumberGenerator() {
    return Math.floor(Math.random() * 101);
  }

  //select a random event type
  function randomEventSelect() {
    const events = [
      //normal events
      "Luck of the Draw",
      "Swapparoo",
      "Trade & Bargain",
      "Wormhole",
      "Whopping Wormhole",
      "Shade Shuffle",
      "Flip & Fill",
      // "Pick & Pray",
    ];

    const environments = [
      //environment events
      "Silent Library",
      "Mafia Manor",
      "Cosy Campsite",
    ];

    if (numberOfPlayers > 3) {
      events.push("New Neighbours");
    }

    let eventOrEnvironment = () => {
      let randomNumber = randomNumberGenerator();

      console.log(randomNumber);
      if (randomNumber <= 25) {
        return "environment";
      } else {
        return "event";
      }
    };

    let selectedEvent;

    if (eventOrEnvironment() === "environment") {
      selectedEvent =
        environments[Math.floor(Math.random() * environments.length)];

      console.log(selectedEvent);

      while (selectedEvent.toLowerCase() === environment) {
        selectedEvent =
          environments[Math.floor(Math.random() * environments.length)];
      }
      setEventType(selectedEvent);
    } else if (eventOrEnvironment() === "event") {
      selectedEvent = events[Math.floor(Math.random() * events.length)];
      console.log(selectedEvent);
      setEventType(selectedEvent);
    }
  }

  function generateEventDetails() {
    console.log(`eventtype is ${eventType}`);
    let text = "";

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
    ];

    const colourTypes = ["green", "red", "blue", "yellow"];

    const [randomNumber1] = generateTwoUniqueRandomNumbers(playerNames);

    const randomCardType =
      cardTypes[Math.floor(Math.random() * cardTypes.length)];

    const randomColourType =
      colourTypes[Math.floor(Math.random() * colourTypes.length)];

    const randomCardNumber = Math.ceil(Math.random() * 3);

    let header = (
      <h1>
        <span className="underline">{eventType}!</span>
      </h1>
    );

    setHeader(header);

    let playersInvolved;
    let instructions;
    if (eventType.toLowerCase() == "luck of the draw") {
      playersInvolved = (
        <>
          <p>
            The player involved is{" "}
            <span className="font-bold underline">
              {playerNames[Math.floor(Math.random() * playerNames.length)]}
            </span>
          </p>
        </>
      );
      instructions = (
        <>
          <p>
            The player must draw cards until they get{" "}
            {/^[aeiouAEIOU].*/.test(randomCardType) ? "an" : "a"}{" "}
            <span className="font-bold underline">{randomCardType}</span> card!
          </p>
        </>
      );
    } else if (eventType.toLowerCase() == "swapparoo") {
      const [randomNumber1, randomNumber2] =
        generateTwoUniqueRandomNumbers(playerNames);
      playersInvolved = (
        <>
          <p>
            The players involved are{" "}
            <span className="font-bold underline">
              {playerNames[randomNumber1]}
            </span>{" "}
            and{" "}
            <span className="font-bold underline">
              {playerNames[randomNumber2]}
            </span>
          </p>
        </>
      );
      instructions = (
        <p>The players must swap all their cards with each other!</p>
      );
    } else if (eventType.toLowerCase() == "trade & bargain") {
      const [randomNumber1, randomNumber2] =
        generateTwoUniqueRandomNumbers(playerNames);
      playersInvolved = (
        <>
          <p>
            The players involved are{" "}
            <span className="font-bold underline">
              {playerNames[randomNumber1]}
            </span>{" "}
            and{" "}
            <span className="font-bold underline">
              {playerNames[randomNumber2]}
            </span>
          </p>
        </>
      );
      instructions = (
        <p>
          The players must swap{" "}
          <span className="underline font-bold">{randomCardNumber}</span>{" "}
          {randomCardNumber > 1 ? "cards " : "card "} with each other!
        </p>
      );
    } else if (eventType.toLowerCase() == "wormhole") {
      playersInvolved = (
        <>
          <p>
            The player involved is{" "}
            <span className="font-bold underline">
              {playerNames[Math.floor(Math.random() * playerNames.length)]}
            </span>
          </p>
        </>
      );
      instructions = (
        <p>
          The player must remove all{" "}
          <span className="font-bold underline">
            {cardTypes[Math.floor(Math.random() * cardTypes.length)]}
          </span>{" "}
          cards from their hand!
        </p>
      );
    } else if (eventType.toLowerCase() == "flip & fill") {
      playersInvolved = (
        <>
          <p>
            The player involved is{" "}
            <span className="font-bold underline">
              {playerNames[Math.floor(Math.random() * playerNames.length)]}
            </span>
          </p>
        </>
      );
      instructions = (
        <p>
          The player must flip the next card in the draw pile and draw that
          number of cards. Special cards means zero.
        </p>
      );
    }
    // else if (eventType.toLowerCase() == "pick & pray") {
    //   const [randomNumber1, randomNumber2] =
    //     generateTwoUniqueRandomNumbers(playerNames);
    //   let randomNumber3 = Math.floor(Math.random() * playerNames.length);
    //   if (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2) {
    //     playersInvolved = (
    //       <>
    //         <p>
    //           The players involved are{" "}
    //           <span className="font-bold underline">
    //             {playerNames[randomNumber1]}
    //           </span>{" "}
    //           and{" "}
    //           <span className="font-bold underline">
    //             {playerNames[randomNumber2]}
    //           </span>{" "}
    //         </p>
    //       </>
    //     );
    //   } else {
    //     playersInvolved = (
    //       <>
    //         <p>
    //           The players involved are{" "}
    //           <span className="font-bold underline">
    //             {playerNames[randomNumber1]}
    //           </span>{" "}
    //           ,{" "}
    //           <span className="font-bold underline">
    //             {playerNames[randomNumber2]}
    //           </span>{" "}
    //           and{" "}
    //           <span className="font-bold underline">
    //             {playerNames[randomNumber3]}
    //           </span>
    //         </p>
    //       </>
    //     );
    //   }

    //   instructions = (
    //     <p>
    //       <span className="font-bold underline">
    //         {playerNames[randomNumber1]}
    //       </span>{" "}
    //       must take a card from{" "}
    //       <span className="font-bold underline">
    //         {playerNames[randomNumber2]}
    //       </span>
    //       .{" "}
    //       <span className="font-bold underline">
    //         {playerNames[randomNumber3]}
    //       </span>{" "}
    //       must draw cards equal to the taken card. Special cards means zero.
    //     </p>
    //   );
    // }
    else if (eventType.toLowerCase() == "whopping wormhole") {
      playersInvolved = (
        <>
          <p>Everyone is affected!</p>
        </>
      );
      instructions = (
        <p>
          Everyone must remove all{" "}
          <span className="font-bold underline">
            {cardTypes[Math.floor(Math.random() * cardTypes.length)]}
          </span>{" "}
          cards from their hand!
        </p>
      );
    } else if (eventType.toLowerCase() == "shade shuffle") {
      playersInvolved = (
        <>
          <p>Everyone is affected!</p>
        </>
      );
      instructions = (
        <p>
          The colour in play has now been changed to{" "}
          <span className="font-bold underline">{randomColourType}</span>
        </p>
      );
    } else if (eventType.toLowerCase() == "new neighbours") {
      const [randomNumber1, randomNumber2] =
        generateTwoUniqueRandomNumbers(playerNames);
      playersInvolved = (
        <>
          <p>
            The players involved are{" "}
            <span className="font-bold underline">
              {playerNames[randomNumber1]}
            </span>{" "}
            and{" "}
            <span className="font-bold underline">
              {playerNames[randomNumber2]}
            </span>
          </p>
        </>
      );
      instructions = (
        <p>
          The players must{" "}
          <span className="font-bold underline">swap seats</span> with each
          other!
        </p>
      );
    } else if (eventType.toLowerCase() == "silent library") {
      setEnvironment("silent library");
      playersInvolved = (
        <>
          <p>New Environment!</p>
        </>
      );
      instructions = <p>The game must now continue in complete silence.</p>;
    } else if (eventType.toLowerCase() == "mafia manor") {
      setEnvironment("mafia manor");
      playersInvolved = (
        <>
          <p>New Environment!</p>
        </>
      );
      instructions = <p>All pick up card effects are doubled.</p>;
    } else if (eventType.toLowerCase() == "cosy campsite") {
      setEnvironment("cosy campsite");
      playersInvolved = (
        <>
          <p>New Environment!</p>
        </>
      );
      instructions = <p>All pick up card effects are halved.</p>;
    }
    let playContinue = (
      <p>
        Play will continue from{" "}
        <span className="font-bold underline">
          {playerNames[randomNumber1]}
        </span>
      </p>
    );
    setPlayersInvolved(playersInvolved);
    setInstructions(instructions);
    setPlayContinue(playContinue);
  }

  //count down to keep track of how many times an event has not happened in a row

  function handleClick() {
    const randomNumber = randomNumberGenerator();

    setEventTriggered(false);

    if ((randomNumber <= 25 && !eventTriggeredCooldown) || countDown == 0) {
      playYesEvent();
      randomEventSelect();
    } else {
      setEventTriggeredCooldown(false);
      setIsLoading(true);
      setCountDown((prev) => {
        return prev - 1;
      });
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
    if (!isSoundEffectMuted) {
      // Check if not globally muted
      noEventAudio.play();
    }
  };

  const playYesEvent = () => {
    if (!isSoundEffectMuted) {
      // Check if not globally muted
      yesEventAudio.play();
    }
  };

  return (
    <>
      <div className="row-start-5 row-span-3 col-start-3 col-span-8 ">
        <button
          className={`playedCardButton active:bg-customYellowActive `}
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
