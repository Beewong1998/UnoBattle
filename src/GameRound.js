import React, { useState } from "react";

export default function GameRound({ gameRound }) {
  return (
    <>
      <div className="row-start-4 row-span-3 col-start-3 col-span-8 mt-3">
        <h1 className="font-semibold text-4xl underline">Game {gameRound}</h1>
      </div>
    </>
  );
}
