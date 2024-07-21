import React, { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import TextToSpeech from "./TextToSpeech";

export default function EventArea({
  eventType,
  setEventType,
  playerNames,
  setEventTriggered,
  isGlobalMute,
  isAnnouncerMuted,
  voice,
  language,
  setEnvironment,
  environment,
  header,
  playersInvolved,
  instructions,
  playContinue,
}) {
  const [showEvent, setShowEvent] = useState(false);

  const [skip, setSkip] = useState(false);

  useEffect(() => {
    // Add a small delay to start the animation after component mount
    const eventDelay = setTimeout(() => setShowEvent(true), 100);

    return () => {
      clearTimeout(eventDelay);
    };
  }, []);

  function removeAllHtmlTags(html) {
    return html.replace(/<[^>]*>/g, "");
  }

  let text = "";
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
      {!skip && (
        <div
          className={`row-start-1 row-span-8 col-start-2 col-span-10 mt-16`}
          onClick={() => {
            setSkip(true);
          }}
        >
          <div
            className={`font-bold text-6xl underline bg-customRed w-full pt-4 pb-6 rounded-lg event-area ${
              showEvent ? "show-event" : ""
            }`}
          >
            {header}
          </div>
          <div
            className={`player-area ${
              showEvent ? "show-players-involved" : ""
            }`}
          >
            <div className="font-bold text-3xl text-center text-white underline pt-6">
              Players involved
            </div>
            <div className="font-medium px-3 text-2xl bg-customYellow w-full py-4 rounded-lg mt-3">
              {playersInvolved}
            </div>
          </div>
          <div
            className={`instruction-area ${
              showEvent ? "show-instructions" : ""
            }`}
          >
            <div className="font-bold text-3xl text-center text-white underline pt-6">
              Instructions
            </div>
            <div className="font-medium px-3 text-2xl bg-customGreen w-full py-4 rounded-lg mt-3">
              {instructions}
            </div>
          </div>
          <hr className="mt-8" />
          <div
            className={`next-player-area ${
              showEvent ? "show-next-player" : ""
            }`}
          >
            <div className="font-medium px-3 text-2xl bg-customLightBlue w-full py-4 rounded-lg mt-8">
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
                setEventType(null);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {skip && (
        <div
          className={`row-start-1 row-span-8 col-start-2 col-span-10 mt-16`}
          onClick={() => {
            setEventTriggered(false);
            setEventType(null);
          }}
        >
          <div
            className={`font-bold text-6xl underline bg-customRed w-full pt-4 pb-6 rounded-lg event-area ${
              showEvent ? "show-event" : ""
            }`}
          >
            {header}
          </div>
          <div
            className={`player-area show-players-involved
            `}
          >
            <div className="font-bold text-3xl text-center text-white underline pt-6">
              Players involved
            </div>
            <div className="font-medium px-3 text-2xl bg-customYellow w-full py-4 rounded-lg mt-3">
              {playersInvolved}
            </div>
          </div>
          <div className={`instruction-area show-instructions`}>
            <div className="font-bold text-3xl text-center text-white underline pt-6">
              Instructions
            </div>
            <div className="font-medium px-3 text-2xl bg-customGreen w-full py-4 rounded-lg mt-3">
              {instructions}
            </div>
          </div>
          <hr className="mt-8" />
          <div className={`next-player-area show-next-player`}>
            <div className="font-medium px-3 text-2xl bg-customLightBlue w-full py-4 rounded-lg mt-8">
              {playContinue}
            </div>
            <TextToSpeech
              text=""
              isAnnouncerMuted={isAnnouncerMuted}
              voice={voice}
              language={language}
            />

            <button
              className="button bg-customRed text-black font-bold w-4/5 rounded-lg mt-4 text-s p-2"
              onClick={() => {
                setEventTriggered(false);
                setEventType(null);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
