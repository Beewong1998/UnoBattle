import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentSlash,
  faQuestion,
  faGun,
  faCampground,
} from "@fortawesome/free-solid-svg-icons";

export default function Environment({ environment }) {
  return (
    <>
      <div className="row-start-3 row-span-1 col-start-5 col-span-4">
        {!environment && (
          <FontAwesomeIcon
            size="xl"
            icon={faQuestion}
            style={{ color: "#c0c0c0" }}
          />
        )}
        {environment === "silent library" && (
          <FontAwesomeIcon
            size="xl"
            icon={faCommentSlash}
            style={{ color: "#c0c0c0" }}
          />
        )}
        {environment === "mafia manor" && (
          <FontAwesomeIcon
            size="xl"
            icon={faGun}
            style={{ color: "#c0c0c0" }}
          />
        )}
        {environment === "cosy campsite" && (
          <FontAwesomeIcon
            size="xl"
            icon={faCampground}
            style={{ color: "#c0c0c0" }}
          />
        )}
      </div>
    </>
  );
}
