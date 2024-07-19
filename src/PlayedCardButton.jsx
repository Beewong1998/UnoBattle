import React, { useState } from "react";
import noEvent from "./sound-effects/noEvent.mp3";
import yesEvent from "./sound-effects/yesEvent.mp3";
import { pulsar } from "ldrs";

pulsar.register();

export default function PlayedCardButton({
  setEventTriggered,
  setEventType,
  isSoundEffectMuted,
  numberOfPlayers,
  environment,
}) {
  const [isLoading, setIsLoading] = useState(false);
  //state to keep of how many times an event has not happened in a row
  const [countDown, setCountDown] = useState(4);
  //state to keep of event happening so it does not happen twice in a row
  const [eventTriggeredCooldown, setEventTriggeredCooldown] = useState(true);

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
      "Pick & Pray",
    ];

    const environments = [
      //environment events
      "Silent Library",
      // "Mafia Manor",
      // "Cosy Campsite",
    ];

    if (numberOfPlayers > 3) {
      events.push("New Neighbours");
    }

    let eventOrEnvironment = () => {
      let randomNumber = randomNumberGenerator();

      console.log(randomNumber);
      if (randomNumber <= 100) {
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
      setEventType(selectedEvent);
    }
  }

  //count down to keep track of how many times an event has not happened in a row

  function handleClick() {
    const randomNumber = randomNumberGenerator();

    setEventTriggered(false);

    if ((randomNumber <= 25 && !eventTriggeredCooldown) || countDown == 0) {
      playYesEvent();
      setEventTriggered(true);
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
