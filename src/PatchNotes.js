import React, { useState } from "react";

export default function PatchNotes() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {modalOpen ? (
        <div className="row-start-1 row-span-10 col-start-1 col-span-10">
          <div className="w-screen h-screen bg-customYellow "></div>
        </div>
      ) : (
        ""
      )}
      <div className="row-start-12 row-span-1 col-start-5 col-span-4">
        <button
          className="bg-customGreen text-black font-semibold w-24 h-6 rounded-2xl mt-3 active:bg-customGreenActive text-sm"
          onClick={() => {
            if (!modalOpen) {
              setModalOpen(true);
            } else setModalOpen(false);
          }}
        >
          Patch Notes
        </button>
      </div>
    </>
  );
}
