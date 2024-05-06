import React, { useState } from "react";
import winnerSound from "./sound-effects/winnerSound.mp3";

export default function WinnerButton({
  winnerDecided,
  setWinnerDecided,
  isGlobalMuted,
}) {
  const [winnerSoundAudio] = useState(new Audio(winnerSound));
  const playWinnerSound = () => {
    if (!isGlobalMuted) {
      // Check if not globally muted
      winnerSoundAudio.play();
    }
  };
  return (
    <>
      <div className="row-start-8 row-span-1 col-start-7 col-span-4">
        <button
          className="winnerButton active:bg-customRedActive"
          onClick={() => {
            playWinnerSound();
            if (!winnerDecided) {
              setWinnerDecided(true);
            } else setWinnerDecided(false);
          }}
        >
          Track Score
        </button>
      </div>
    </>
  );
}
