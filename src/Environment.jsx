import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentSlash,
  faGun,
  faCampground,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import styles from "./css/Settings.module.css";

export default function Environment({
  environment,
  environmentInformation,
  setEnvironmentInformation,
}) {
  return (
    <>
      <div className="row-start-2 row-span-1 col-start-5 col-span-4 flex justify-center">
        {environment && (
          <div
            className="shadow-md rounded-xl w-12 h-12 p-2 bg-customRed flex justify-center items-center cursor-pointer"
            onClick={() => {
              setEnvironmentInformation(!environmentInformation);
            }}
          >
            {environment === "silent library" && (
              <FontAwesomeIcon
                size="xl"
                icon={faCommentSlash}
                style={{ color: "black" }}
              />
            )}
            {environment === "mafia manor" && (
              <FontAwesomeIcon
                size="xl"
                icon={faGun}
                style={{ color: "black" }}
              />
            )}
            {environment === "cosy campsite" && (
              <FontAwesomeIcon
                size="xl"
                icon={faCampground}
                style={{ color: "black" }}
              />
            )}
          </div>
        )}
        <CSSTransition
          in={environmentInformation}
          timeout={500}
          classNames={{
            enter: styles["modal-enter"],
            exit: styles["modal-exit"],
          }}
          unmountOnExit
        >
          <div
            className={`z-50 absolute bg-customDeepBlue h-3/5 w-full top-32 flex flex-col items-center pb-6 rounded-2xl`}
          >
            <div className=" w-4/5 rounded-t-lg text-4xl font-semibold text-center mt-5 py-3 bg-customLightBlue">
              {environment}
            </div>
            <div className="h-4/5 w-4/5 bg-customWhite text-left p-6 rounded-b-2xl">
              {environment === "cosy campsite" && (
                <>
                  <p>
                    All pick up card effects from other players are halved.
                    Round up the number if it is a fraction.
                  </p>
                  <p className="mt-8">
                    For example: John plays a pick up 4 to Susan, but because of
                    cosy campsite, Susan only needs to pick up 2 cards!
                  </p>
                </>
              )}
              {environment === "mafia manor" && (
                <>
                  <p>
                    All pick up card effects from other players are doubled.
                    Round up the number if it is a fraction.
                  </p>
                  <p className="mt-8">
                    For example: John plays a pick up 4 to Susan, but because of
                    mafia manor, Susan will need to pick up 8 cards!
                  </p>
                </>
              )}
              {environment === "silent library" && (
                <>
                  <p>
                    The game must now be played in silence as long as silent
                    library is active!
                  </p>
                  <p className="mt-8">
                    Whoever talks will need to pick up 2 cards
                  </p>
                </>
              )}
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
