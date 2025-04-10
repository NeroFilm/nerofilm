import { Link } from "react-router-dom";
import { useFrame, useFrameUpdate } from "../../hooks/useFrame";
import Frame from "../../components/Frame/Frame";
import WhiteBackHeader from "../../components/WhiteBackHeader/WhiteBackHeader";
import "./index.css";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import { playClickSound } from "../../utils/soundUtils";
import { useEffect } from "react";
import { defaultFrame } from "../../constants/frames";
import { useRef } from "react";
import originalBlack from "../../assets/frames/original-black.png";
import wideBlack from "../../assets/frames/wide-black.png";

function FrameLayout() {
  const options = ["original", "wide"];

  const frame = useFrame();
  const setFrame = useFrameUpdate();
  useRefreshWarning();
  const frameMounted = useRef(false);

  const handleSelectLayout = (layout) => {
    playClickSound();
    setFrame({
      ...frame,
      layout,
      design: layout == "original" ? originalBlack : wideBlack,
    });
  };

  useEffect(() => {
    if (!frameMounted.current) {
      setFrame(defaultFrame);
      frameMounted.current = true;
    }
  }, [setFrame]);

  return (
    <div>
      <WhiteBackHeader />
      <section className="options-c">
        <h1 className="options-heading">Select Frame Layout</h1>
        <div className="options-r">
          <ul className="frame-options">
            {options.map((option, key) => (
              <li key={key} onClick={() => handleSelectLayout(option)}>
                <div
                  className={
                    frame.layout === option
                      ? "frame-selected frame-select-wrapper"
                      : "frame-select-wrapper"
                  }
                >
                  <Frame
                    images={frame.images}
                    filter={frame.filter}
                    layout={option}
                    design={option == "original" ? originalBlack : wideBlack}
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
