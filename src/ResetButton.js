import React, { useState } from "react";

export default function ResetButton() {
  const [confirmation, setConfirmation] = useState(false);
  return (
    <>
      {!confirmation ? (
        <button onClick={() => setConfirmation(true)}>Reset All</button>
      ) : (
        <>
          <p>Are you sure you want to reset everything?</p>
          <button onClick={() => window.location.reload()}>Yes</button>
          <button onClick={() => setConfirmation(false)}>No</button>
        </>
      )}
    </>
  );
}
