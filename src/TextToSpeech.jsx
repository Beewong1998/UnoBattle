import React, { useEffect, useState } from "react";

const TextToSpeech = ({ text, isGlobalMute, voice }) => {
  useEffect(() => {
    if (!isGlobalMute) {
      const speechSynthesis = window.speechSynthesis;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      speechSynthesis.speak(utterance);
    }

    return () => {
      // Clean up the speech synthesis when the component unmounts
      if (!isGlobalMute) {
        speechSynthesis.cancel();
      }
    };
  }, [text]);

  return <div></div>;
};

export default TextToSpeech;
