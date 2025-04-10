import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import { Link } from "react-router-dom";
import WhiteBackHeader from "../../components/WhiteBackHeader/WhiteBackHeader";
import Options from "../../components/Options/Options";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import { useEffect, useState } from "react";
import frameDesigns from "../../constants/frameDesigns";

function FrameDesign() {
  useRefreshWarning();

  const [frameDesign, setFrameDesign] = useState("");

  const frame = useFrame();
  const setFrame = useFrameUpdate();

  useEffect(() => {
    if (frameDesign && frameDesign !== frame.design) {
      console.log("updating frame");
      setFrame((prevFrame) => ({ ...prevFrame, design: frameDesign }));
    }
  }, [setFrame, frame.design, frameDesign]);

  return (
    <div>
      <WhiteBackHeader />
      <section className="options-c">
        <h1 className="options-heading">Choose frame</h1>
        <section className="options-r">
          <Frame
            images={frame.images}
            filter={frame.filter}
            layout={frame.layout}
            design={frame.design}
          />
          <div className="options-box">
            <Options
              options={frameDesigns}
              onClick={(option) =>
                setFrameDesign(
                  frame.layout === "original" ? option.original : option.wide
                )
              }
              selected={frame.design}
            />
          </div>
        </section>
        <Link className="btn" to="/filter" role="btn">
          Continue
        </Link>
      </section>
    </div>
  );
}

export default FrameDesign;
