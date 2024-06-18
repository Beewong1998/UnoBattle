import React, { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import TextToSpeech from "./TextToSpeech";

export default function EventArea({
  eventType,
  playerNames,
  setEventTriggered,
  isGlobalMute,
  isAnnouncerMuted,
  voice,
  language,
}) {
  const [showEvent, setShowEvent] = useState(false);

  useEffect(() => {
    // Add a small delay to start the animation after component mount
    const eventDelay = setTimeout(() => setShowEvent(true), 100);

    return () => {
      clearTimeout(eventDelay);
    };
  }, []);

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
  } else if (eventType.toLowerCase() == "trade and bargain") {
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
  } else if (eventType.toLowerCase() == "flip and fill") {
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
        The player must flip the next card in the draw pile and draw that number
        of cards. Special cards means zero.
      </p>
    );
  } else if (eventType.toLowerCase() == "whopping wormhole") {
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
        The players must <span className="font-bold underline">swap seats</span>{" "}
        with each other!
      </p>
    );
  }
  let playContinue = (
    <p>
      Play will continue from{" "}
      <span className="font-bold underline">{playerNames[randomNumber1]}</span>
    </p>
  );
  function removeAllHtmlTags(html) {
    return html.replace(/<[^>]*>/g, "");
  }
  //converts JSX into a string
  const createSpeechToTextParagraph = () => {
    const eventNameString = renderToString(header);
    const playersInvolvedString = renderToString(playersInvolved);
    const instructionsString = renderToString(instructions);
    const playContinueString = renderToString(playContinue);
    text = `${eventNameString}. ${playersInvolvedString}. ${instructionsString}. ${playContinueString}.`;
    //remove all html tags from the text
    text = removeAllHtmlTags(text);
  };

  createSpeechToTextParagraph();

  return (
    <>
      <div className={`row-start-2 row-span-8 col-start-2 col-span-10`}>
        <div
          className={`font-bold text-6xl underline bg-customRed w-full pt-4 pb-6 rounded-lg event-area ${
            showEvent ? "show-event" : ""
          }`}
        >
          {header}
        </div>
        <div
          className={`player-area ${showEvent ? "show-players-involved" : ""}`}
        >
          <div className="font-bold text-3xl text-center text-white underline pt-6">
            Players involved
          </div>
          <div className="font-medium px-3 text-2xl bg-customYellow w-full py-4 rounded-lg mt-3">
            {playersInvolved}
          </div>
        </div>
        <div
          className={`instruction-area ${showEvent ? "show-instructions" : ""}`}
        >
          <div className="font-bold text-3xl text-center text-white underline pt-6">
            Instructions
          </div>
          <div className="font-medium px-3 text-2xl bg-customGreen w-full py-4 rounded-lg mt-3">
            {instructions}
          </div>
        </div>
        <hr className="mt-10" />
        <div
          className={`next-player-area ${showEvent ? "show-next-player" : ""}`}
        >
          <div className="font-medium px-3 text-2xl bg-customLightBlue w-full py-4 rounded-lg mt-10">
            {playContinue}
          </div>
          <TextToSpeech
            text={text}
            isAnnouncerMuted={isAnnouncerMuted}
            voice={voice}
            language={language}
          />
          <button
            className="button bg-customRed text-black font-bold w-4/5 rounded-lg mt-4 text-s p-2"
            onClick={() => {
              setEventTriggered(false);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
