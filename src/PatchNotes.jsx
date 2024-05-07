import React, { useState } from "react";
import styles from "./css/PatchNotes.module.css";

export default function PatchNotes() {
  const [modalOpen, setModalOpen] = useState(false);
  const version = "1.0.5";
  const patchData = [
    {
      updates: [
        "Flow of game play improvement - There cannot be two events in a row",
        "Flow of game play improvement - One event must happen for every 5 played cards",
        "Added mute sound button",
        "Added sound effect for track score and submit button",
        "Made patch notes look awesome",
      ],
      date: "05/05/24",
      version: "1.0.5",
    },
    {
      updates: [
        "Bug fix - Inputs could be left empty",
        "Bug fix - Play card button being spammed would cause the app to crash",
      ],
      date: "04/05/24",
      version: "1.0.4",
    },
    {
      updates: [
        "Added game round tracker",
        "Bug fix - Sound effect not matching up with visuals",
        "Bug fix - Mobile horizontal caused some elements to overlap",
      ],
      date: "03/05/24",
      version: "1.0.3",
    },
    {
      updates: [
        "Created 4 new events",
        "Added play card animation ",
        "Improved appearance of score tracking",
        "Bug fix - Patch note button not appearing properly",
      ],
      date: "02/05/24",
      version: "1.0.2",
    },
    {
      updates: [
        "Added transitions for the event page",
        "Added sound effects to play card and event triggering",
      ],
      date: "01/05/24",
      version: "1.0.1",
    },
    {
      updates: ["Robeeto was born!"],
      date: "30/04/24",
      version: "1.0.0",
    },
  ];

  return (
    <>
      {modalOpen ? (
        <div className="row-start-1 row-span-10 col-start-1 col-span-10 z-10 h-screen">
          <div className="w-screen h-screen bg-customYellow">
            <div className={styles["patch-notes-container"]}>
              <div className={styles["patch-notes-header"]}>
                <h1>Patch Notes</h1>
              </div>
              <div
                onClick={() => {
                  if (!modalOpen) {
                    setModalOpen(true);
                  } else setModalOpen(false);
                }}
                className={styles["patch-notes-return"]}
              >
                <h1>Return to game</h1>
              </div>
              {patchData.map((patch, index) => {
                return (
                  <div className={styles["patch-notes-section"]}>
                    <h2>
                      <span className="font-bold">{patch.version}</span> -{" "}
                      {patch.date}
                    </h2>
                    <ul>
                      {patch.updates.map((update, index) => {
                        return <li key={index}>{update}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
              <button
                className="bg-customGreen text-black font-base w-24 h-6 rounded-2xl mt-8 mb-2 active:bg-customGreenActive text-sm shadow-md"
                onClick={() => {
                  if (!modalOpen) {
                    setModalOpen(true);
                  } else setModalOpen(false);
                }}
              >
                Patch Notes
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {!modalOpen && (
        <div className="row-start-12 row-span-1 col-start-5 col-span-4 z-20">
          <button
            className="bg-customGreen text-black font-base w-24 h-6 rounded-2xl mt-2 active:bg-customGreenActive text-sm shadow-lg"
            onClick={() => {
              if (!modalOpen) {
                setModalOpen(true);
              } else setModalOpen(false);
            }}
          >
            Patch Notes
          </button>
        </div>
      )}
    </>
  );
}
