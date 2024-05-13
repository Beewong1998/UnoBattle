import React, { useEffect, useState } from "react";

const TextToSpeech = ({ text, isGlobalMute, voice, language }) => {
  useEffect(() => {
    if (!isGlobalMute) {
      const speechSynthesis = window.speechSynthesis;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = language;
      speechSynthesis.speak(utterance);
    }

    return () => {
      // Clean up the speech synthesis when the component unmounts
      if (!isGlobalMute) {
        speechSynthesis.cancel();
      }
    };
  }, [text, language]);

  return <div></div>;
};

export default TextToSpeech;
