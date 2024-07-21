import React, { useEffect, useState } from "react";

const SelectVoice = ({ voice, setVoice, setLanguage }) => {
  const speechSynthesis = window.speechSynthesis;

  const handleVoiceChange = (event) => {
    const selectedVoiceName = event.target.value;
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((v) => v.name === selectedVoiceName);

    if (selectedVoice) {
      setVoice(selectedVoice);
      setLanguage(selectedVoice.lang);
    }
  };
  const voices = window.speechSynthesis.getVoices();

  window.speechSynthesis.getVoices().map((voice) => {});

  return (
    <div className="w-full">
      <label>
        <div className="text-left pl-1 font-semibold">
          Change Announcer Voice:
        </div>
        <select
          className="w-full "
          value={voice?.name}
          onChange={handleVoiceChange}
        >
          {window.speechSynthesis.getVoices().map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectVoice;
