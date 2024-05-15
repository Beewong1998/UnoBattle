import React, { useState } from "react";
import trackScore from "./sound-effects/trackScore.mp3";

export default function WinnerButton({
  winnerDecided,
  setWinnerDecided,
  isSoundEffectMuted,
}) {
  const [trackScoreAudio] = useState(new Audio(trackScore));
  const playWinnerSound = () => {
    if (!isSoundEffectMuted) {
      // Check if not globally muted
      trackScoreAudio.play();
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
