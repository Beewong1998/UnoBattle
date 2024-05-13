import React, { useEffect, useState } from "react";

const SelectVoice = ({ voice, setVoice }) => {
  const speechSynthesis = window.speechSynthesis;

  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value));
  };

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
