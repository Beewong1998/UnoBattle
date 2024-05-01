import React, { useState } from "react";

export default function WinnerButton({ winnerDecided, setWinnerDecided }) {
  return (
    <>
      <div className="row-start-8 row-span-1 col-start-7 col-span-4">
        <button
          className="winnerButton active:bg-customRedActive"
          onClick={() => {
            if (!winnerDecided) {
              setWinnerDecided(true);
            } else setWinnerDecided(false);
          }}
        >
          Track Winner
        </button>
      </div>
    </>
  );
}
