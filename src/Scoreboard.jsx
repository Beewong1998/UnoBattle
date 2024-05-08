import React, { useState } from "react";
import "ldrs/ring";
import { hourglass } from "ldrs";

hourglass.register();

export default function Scoreboard({ playerScores, isGlobalMuted }) {
  // Render the table rows for each player
  const tableRows = playerScores.map((player, index) => (
    <tr className="text-lg" key={index}>
      <td className="border-x border-customDeepBlue">{index + 1}</td>
      <td className="border-x border-customDeepBlue">{player.name}</td>
      <td className="border-x border-customDeepBlue">{player.score}</td>
    </tr>
  ));

  return (
    <>
      <div className={`row-start-2 row-span-8 col-start-2 col-span-10 z-50`}>
        <table className="bg-customYellow  w-full h-full">
          <thead className="border border-customDeepBlue">
            <tr>
              <th className="border border-customDeepBlue">Position</th>
              <th className="border border-customDeepBlue">Player</th>
              <th className="border border-customDeepBlue">Total Score</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </>
  );
}
