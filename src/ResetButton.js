import React, { useState } from "react";

export default function ResetButton() {
  const [confirmation, setConfirmation] = useState(false);
  return (
    <>
      <div className="row-start-8 row-span-1 col-start-3 col-span-4">
        {!confirmation ? (
          <button className="resetButton" onClick={() => setConfirmation(true)}>
            Reset All
          </button>
        ) : (
          <>
            <button className="bg-customLightBlue text-black font-bold w-4/5 h-4/5 rounded-2xl mt-3 text-s">
              <p className="underline mb-2">Are you sure?</p>
              <button className="mr-3" onClick={() => window.location.reload()}>
                Yes
              </button>
              <button className="ml-3" onClick={() => setConfirmation(false)}>
                No
              </button>
            </button>
          </>
        )}
      </div>
    </>
  );
}
