import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faComment,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import MuteButton from "./MuteButton";
import SelectVoice from "./SelectVoice";

export default function Settings({
  isGlobalMuted,
  toggleGlobalMute,
  voice,
  setVoice,
  setIsGlobalMuted,
  setLanguage,
}) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const toggleSettings = () => {
    setIsSettingOpen(!isSettingOpen);
  };
  return (
    <>
      <div className="row-start-1  col-start-12 z-0 mt-4 mr-4">
        <button onClick={toggleSettings}>
          <FontAwesomeIcon
            size="xl"
            icon={faGear}
            style={{ color: "#c0c0c0" }}
          />
        </button>
      </div>
      {isSettingOpen && (
        <>
          <div
            className={`row-start-2 row-span-9 col-start-1 col-span-12 px-3 z-40`}
          >
            <div className="bg-customDeepBlue w-full h-1/12 rounded-lg text-4xl font-semibold mb-2 text-left pl-2">
              Settings
            </div>
            <div className="bg-customWhite  w-full h-5/6 rounded-lg flex flex-col justify-around items-center">
              <div className="bg-white  w-5/6 h-1/6 rounded-lg">
                <div className="flex flex-row h-full items-center pr-3">
                  <div className="w-16">
                    <FontAwesomeIcon
                      className="px-4 w-7"
                      size="xl"
                      icon={faComment}
                      style={{ color: "#c0c0c0" }}
                    />
                  </div>
                  <SelectVoice
                    voice={voice}
                    setVoice={setVoice}
                    setLanguage={setLanguage}
                  />
                </div>
              </div>
              <div className="bg-white  w-5/6 h-1/6 rounded-lg">
                <div className="flex flex-row h-full items-center pr-3">
                  <div className="w-16">
                    {!isGlobalMuted ? (
                      <FontAwesomeIcon
                        className="px-4 w-7"
                        size="xl"
                        icon={faVolumeHigh}
                        style={{ color: "#c0c0c0" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="px-4 w-7"
                        size="xl"
                        icon={faVolumeXmark}
                        style={{ color: "#c0c0c0" }}
                      />
                    )}
                  </div>

                  <MuteButton
                    isGlobalMuted={isGlobalMuted}
                    toggleGlobalMute={toggleGlobalMute}
                    setIsGlobalMuted={setIsGlobalMuted}
                  />
                </div>
              </div>
              <div className="bg-white  w-5/6 h-1/6 rounded-lg"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// className={`row-start-2 row-span-9 col-start-1 col-span-12 px-3 z-0`
