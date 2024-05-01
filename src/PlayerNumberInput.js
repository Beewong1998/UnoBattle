import React, { useState } from "react";

export default function PlayerNumberInput({
  handleChange,
  handleSubmit,
  numberOfPlayers,
}) {
  return (
    <div className="w-full row-start-6 row-span-6 col-start-3 col-span-8">
      <form onSubmit={handleSubmit}>
        <input
          className="game-input"
          onChange={handleChange}
          placeholder="Enter the number of players"
          type="number"
          min="2"
          max="10"
          value={numberOfPlayers}
        />
        <button
          disabled
          className="button bg-customYellow active:bg-customYellowActive font-bold py-3 px-6 mt-4 rounded mr-3"
        >
          Back
        </button>
        <button
          type="submit"
          className="button bg-customRed active:bg-customRedActive py-3 px-6 mt-4 rounded ml-3"
        >
          Next
        </button>
      </form>
    </div>
  );
}
