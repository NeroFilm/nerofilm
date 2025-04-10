import { useState } from "react";
import PropTypes from "prop-types";
import { FrameContext, FrameUpdateContext } from "./FrameContext";
import { defaultFrame } from "../constants/frames";

export function FrameProvider({ children }) {
  const [frame, setFrame] = useState(defaultFrame);

  function updateFrame(newFrame) {
    setFrame(newFrame);
  }

  return (
    <FrameContext.Provider value={frame}>
      <FrameUpdateContext.Provider value={updateFrame}>
        {children}
      </FrameUpdateContext.Provider>
    </FrameContext.Provider>
  );
}

FrameProvider.propTypes = {
  children: PropTypes.node,
};
