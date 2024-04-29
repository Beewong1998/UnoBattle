import React, { useState } from "react";

export default function WinnerButton({ winnerDecided, setWinnerDecided }) {
  return (
    <button
      onClick={() => {
        if (!winnerDecided) {
          setWinnerDecided(true);
        } else setWinnerDecided(false);
      }}
    >
      Winner Decided
    </button>
  );
}
