import { useFrame, useFrameUpdate } from "../../hooks/useFrame";
import Frame from "../../components/Frame/Frame";
import { Link } from "react-router-dom";
import BackHeader from "../../components/BackHeader/BackHeader";
import Options from "../../components/Options/Options";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import frameDesigns from "../../constants/frameDesigns";
import { useState } from "react";

function FrameDesign() {
  useRefreshWarning();

  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const [selectedDesign, setSelectedDesign] = useState("black");

  return (
    <div>
      <BackHeader />
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
              onClick={(option) => {
                setSelectedDesign(option.name);
                setFrame((prevFrame) => ({
                  ...prevFrame,
                  design:
                    frame.layout === "original" ? option.original : option.wide,
                }));
              }}
              selected={selectedDesign}
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
