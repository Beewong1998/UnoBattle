import React, { useEffect, useState } from "react";

const TextToSpeech = ({ text, isGlobalMute, voice, language }) => {
  useEffect(() => {
    if (!isGlobalMute) {
      const speechSynthesis = window.speechSynthesis;

      const textSections = text.match(/[^.!?]+[.!?]+/g) || [];
      let startTime;
      let endTime;
      const speakQueue = (index) => {
        if (index < textSections.length) {
          const utterance = new SpeechSynthesisUtterance(textSections[index]);
          utterance.voice = voice;
          utterance.lang = language;
          utterance.rate = 1.25;
          startTime = performance.now();

          speechSynthesis.speak(utterance);

          if (index === textSections.length - 1) {
            // This is the last utterance, no need to wait for onend event
            return;
          }

          utterance.onend = () => {
            endTime = performance.now();

            const duration = endTime - startTime;
            console.log(duration);

            setTimeout(() => {
              speakQueue(index + 1);
            }, 2400 - duration);
          };
        }
      };

      speakQueue(0);
    }

    return () => {
      // Clean up the speech synthesis when the component unmounts
      if (!isGlobalMute) {
        speechSynthesis.cancel();
      }
    };
  }, [isGlobalMute, text, voice, language]);

  return <div></div>;
};

export default TextToSpeech;
