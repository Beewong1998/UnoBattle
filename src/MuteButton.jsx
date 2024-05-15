import React, { useState } from "react";

export default function MuteButton({
  isSoundEffectMuted,
  isAnnouncerMuted,
  toggleSoundEffectMute,
  setIsSoundEffectMuted,
  setIsAnnouncerMuted,
}) {
  return (
    <>
      <div className="w-full">
        <div>
          <div className="text-left pl-1 font-semibold">Mute Sound Effects</div>
          <div className="flex flex-row mb-5">
            <button
              className={`${
                isSoundEffectMuted && "bg-customRed"
              } w-20 rounded-xl border`}
              onClick={() => setIsSoundEffectMuted(!isSoundEffectMuted)}
            >
              Mute
            </button>
            <button
              className={`${
                !isSoundEffectMuted && "bg-customGreen"
              } ml-4 w-20 rounded-xl border`}
              onClick={() => setIsSoundEffectMuted(!isSoundEffectMuted)}
            >
              Unmute
            </button>
          </div>
          <div className="text-left pl-1 font-semibold">
            Mute Announcer Voice
          </div>
          <div className="flex flex-row">
            <button
              className={`${
                isAnnouncerMuted && "bg-customRed"
              } w-20 rounded-xl border`}
              onClick={() => setIsAnnouncerMuted(!isAnnouncerMuted)}
            >
              Mute
            </button>
            <button
              className={`${
                !isAnnouncerMuted && "bg-customGreen"
              } ml-4 w-20 rounded-xl border`}
              onClick={() => setIsAnnouncerMuted(!isAnnouncerMuted)}
            >
              Unmute
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
