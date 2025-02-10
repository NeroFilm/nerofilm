import { createContext, useContext, useState } from "react";

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
    layout: "original", // Default to original
    images: [], // Store captured images
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
