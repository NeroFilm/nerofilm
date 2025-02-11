import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const FrameContext = createContext();
const FrameUpdateContext = createContext();

export function useFrame() {
  return useContext(FrameContext);
}

export function useFrameUpdate() {
  return useContext(FrameUpdateContext);
}

export function FrameProvider({ children }) {
  let defaultFrame = {
    layout: "original",
    images: [],
    filter: "default",
    color: "black",
  };

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
  children: PropTypes.node
}
