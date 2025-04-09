import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import { Link } from "react-router-dom";
import WhiteBackHeader from "../../components/WhiteBackHeader/WhiteBackHeader";
import Options from "../../components/Options/Options";
import black from "../../assets/options/black.svg";
import white from "../../assets/options/white.svg";
import pink from "../../assets/options/pink.svg";
import blue from "../../assets/options/blue.svg";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import { useEffect, useState } from "react";

import frame1 from "../../assets/frames/1.png";
import frame2 from "../../assets/frames/2.png";
import frame3 from "../../assets/frames/3.png";
import frame4 from "../../assets/frames/4.png";
import frame5 from "../../assets/frames/5.png";
import frame6 from "../../assets/frames/6.png";
import frame7 from "../../assets/frames/7.png";
import frame8 from "../../assets/frames/8.png";
import frame9 from "../../assets/frames/9.png";
import frame10 from "../../assets/frames/10.png";
import frame11 from "../../assets/frames/11.png";
import frame12 from "../../assets/frames/12.png";

function FrameDesign() {
  useRefreshWarning();

  const [frameDesign, setFrameDesign] = useState("");
  const [tab, setTab] = useState("gallery");

  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const options = [
    { name: "frame1", image: frame1 },
    { name: "frame2", image: frame2 },
    { name: "frame3", image: frame3 },
    { name: "frame4", image: frame4 },
    { name: "frame5", image: frame5 },
    { name: "frame6", image: frame6 },
    { name: "frame7", image: frame7 },
    { name: "frame8", image: frame8 },
    { name: "frame9", image: frame9 },
    { name: "frame10", image: frame10 },
    { name: "frame11", image: frame11 },
    { name: "frame11", image: frame12 },
  ];

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
            <ul className="tabs">
              <li
                className={tab == "gallery" && "selected-tab"}
                onClick={() => {
                  setTab("gallery");
                }}
              >
                Gallery
              </li>
            </ul>
            <Options
              options={options}
              onClick={(option) => setFrameDesign(option.image)}
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
