import { Link } from "react-router-dom";
import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import BackHeader from "../../components/BackHeader/BackHeader";
import "./index.css";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import { playClickSound } from "../../utils/soundUtils";
import { useEffect } from "react";
import { defaultFrame } from "../../constants/frames";
import { useRef } from "react";

function FrameLayout() {
  const options = ["original", "wide"];

  const frame = useFrame();
  const setFrame = useFrameUpdate();
  useRefreshWarning();
  const frameMounted = useRef(false);

  const handleSelectLayout = (layout) => {
    playClickSound();
    setFrame({ ...frame, layout });
  };

  useEffect(() => {
    if (!frameMounted.current) {
      setFrame(defaultFrame);
      frameMounted.current = true;
    }
  }, [setFrame]);

  return (
    <div>
      <BackHeader />
      <section className="options-c">
        <h1>Select Frame Layout</h1>
        <div className="options-r">
          <ul className="frame-options">
            {options.map((option, key) => (
              <li key={key} onClick={() => handleSelectLayout(option)}>
                <div
                  className={
                    frame.layout === option ? "frame-selected" : "frame"
                  }
                >
                  <Frame
                    images={frame.images}
                    filter={frame.filter}
                    layout={option}
                    design={frame.design}
                  />
                </div>
                <p className="frame-desc">
                  {option === "original" ? "4 Cut Original" : "4 Cut Wide"}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <Link className="btn" to="/instructions" role="button">
          Continue
        </Link>
      </section>
    </div>
  );
}

export default FrameLayout;
