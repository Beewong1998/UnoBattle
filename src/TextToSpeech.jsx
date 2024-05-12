import React, { useEffect, useState } from "react";

const TextToSpeech = ({ text }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const handleSpeech = () => {
      const speechSynthesis = window.speechSynthesis;

      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      setPlaying(true);
    };

    if (playing) {
      handleSpeech();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, playing]);

  return (
    <div>
      <p>{text}</p>
      {!playing && <button onClick={() => setPlaying(true)}>Play</button>}
    </div>
  );
};

export default TextToSpeech;
