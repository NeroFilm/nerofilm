import { useContext } from "react";
import { FrameContext, FrameUpdateContext } from "../context/frameContext";

// Custom hooks that use the context values
export function useFrame() {
  return useContext(FrameContext);
}

export function useFrameUpdate() {
  return useContext(FrameUpdateContext);
}
