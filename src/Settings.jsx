import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faComment,
  faVolumeHigh,
  faVolumeXmark,
  faAngleLeft,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import MuteButton from "./MuteButton";
import SelectVoice from "./SelectVoice";
import { CSSTransition } from "react-transition-group";
import styles from "./css/Settings.module.css";

export default function Settings({
  isGameEnd,
  isSoundEffectMuted,
  isAnnouncerMuted,
  toggleSoundEffectMute,
  voice,
  setVoice,
  setIsSoundEffectMuted,
  setIsAnnouncerMuted,
  setLanguage,
  setTutorialOpen,
}) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const toggleSettings = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const toggleSettingsAnimation = () => {
    setRotate(!rotate);
  };
  return (
    <>
      <div className="row-start-1  col-start-12 z-0 mt-4 mr-4">
        <button
          onClick={() => {
            toggleSettings();
            toggleSettingsAnimation();
          }}
        >
          <FontAwesomeIcon
            className={rotate ? "rotate" : ""}
            size="xl"
            icon={faGear}
            style={{ color: "#c0c0c0" }}
          />
        </button>
      </div>
      <CSSTransition
        in={isSettingOpen}
        timeout={500}
        classNames={{
          enter: styles["modal-enter"],
          exit: styles["modal-exit"],
        }}
        unmountOnExit
      >
        <>
          <div
            className={`row-start-2 row-span-9 col-start-1 col-span-12 px-3 z-50`}
          >
            <div
              className="pl-2 pb-2 w-16 flex items-start"
              onClick={() => {
                toggleSettings();
                toggleSettingsAnimation();
              }}
            >
              <FontAwesomeIcon
                size="2xl"
                icon={faAngleLeft}
                style={{ color: "#c0c0c0" }}
              />
            </div>
            <div className="bg-customDeepBlue w-full h-1/12 rounded-lg text-4xl font-semibold mb-2 text-left pl-4">
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
              <div className="bg-white  w-5/6 h-2/6 rounded-lg">
                <div className="flex flex-row h-full items-center pr-3">
                  <div className="w-16">
                    {!isSoundEffectMuted && !isAnnouncerMuted ? (
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
                    isSoundEffectMuted={isSoundEffectMuted}
                    isAnnouncerMuted={isAnnouncerMuted}
                    toggleSoundEffectMute={toggleSoundEffectMute}
                    setIsSoundEffectMuted={setIsSoundEffectMuted}
                    setIsAnnouncerMuted={setIsAnnouncerMuted}
                  />
                </div>
              </div>
              <div className="bg-white  w-5/6 h-1/6 rounded-lg">
                <div className="flex flex-row h-full items-center pr-3">
                  <div className="w-14">
                    <FontAwesomeIcon
                      className=" w-7"
                      size="xl"
                      icon={faQuestionCircle}
                      style={{ color: "#c0c0c0" }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      toggleSettings();
                      setTutorialOpen(true);
                    }}
                    className="text-center ml-1 font-medium w-32 bg-customYellow rounded-lg active:bg-customYellowActive"
                  >
                    Replay tutorial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </CSSTransition>
    </>
  );
}
