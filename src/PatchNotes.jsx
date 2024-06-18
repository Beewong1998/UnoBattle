import React, { useState } from "react";
import styles from "./css/PatchNotes.module.css";
import { CSSTransition } from "react-transition-group";

export default function PatchNotes() {
  const [modalOpen, setModalOpen] = useState(false);

  const patchData = [
    {
      updates: [
        "Created 3 more events - Whopping Wormhole, Flip and Fill, New Neighbours",
      ],
      date: "18/06/24",
      version: "1.1.3",
    },
    {
      updates: [
        "Added tutorial!",
        "Added transition animations for different menus",
      ],
      date: "30/05/24",
      version: "1.1.2",
    },
    {
      updates: [
        "Added announcer for event page",
        "Added settings cogwheel",
        "Added option to change announcer voice",
        "Added option to mute game effects and announcer voice",
      ],
      date: "14/05/24",
      version: "1.1.1",
    },
    {
      updates: [
        "Added end game button which shows you the top 3 players on a podium",
        "Added transitions to the end game screen",
        "Added scoreboard button in the end screen",
        "Added new game button in the end screen",
      ],
      date: "08/05/24",
      version: "1.1.0",
    },
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
      <CSSTransition
        in={modalOpen}
        timeout={500}
        classNames={{
          enter: styles["modal-enter"],
          exit: styles["modal-exit"],
        }}
        unmountOnExit
      >
        <div className="row-start-1 row-span-10 col-start-1 col-span-10 z-50 h-screen">
          <div className="w-screen h-screen bg-customYellow">
            <div className={styles["patch-notes-container"]}>
              <div className={styles["patch-notes-header"]}>
                <h1>Patch Notes</h1>
              </div>
              <div
                onClick={() => {
                  setModalOpen(!modalOpen);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={styles["patch-notes-return"]}
              >
                <h1>Return to game</h1>
              </div>
              {patchData.map((patch, index) => (
                <div className={styles["patch-notes-section"]} key={index}>
                  <h2>
                    <span className="font-bold">{patch.version}</span> -{" "}
                    {patch.date}
                  </h2>
                  <ul>
                    {patch.updates.map((update, idx) => (
                      <li key={idx}>{update}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                className="bg-customGreen text-black font-base w-24 h-6 rounded-2xl mt-8 mb-2 active:bg-customGreenActive text-sm shadow-md"
                onClick={() => {
                  setModalOpen(!modalOpen);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Patch Notes
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
      {!modalOpen && (
        <div className="row-start-12 row-span-1 col-start-5 col-span-4 z-20">
          <button
            className="bg-customGreen text-black font-base w-24 h-6 rounded-2xl mt-2 active:bg-customGreenActive text-sm shadow-lg"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Patch Notes
          </button>
        </div>
      )}
    </>
  );
}
