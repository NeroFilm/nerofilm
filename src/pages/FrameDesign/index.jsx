import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import { Link } from "react-router-dom";
import BackHeader from "../../components/BackHeader/BackHeader";
import Options from "../../components/Options/Options";
import black from "../../assets/options/black.svg";
import white from "../../assets/options/white.svg";
import pink from "../../assets/options/pink.svg";
import blue from "../../assets/options/blue.svg";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import Unsplash from "../../components/Unsplash/Unsplash";
import { useEffect, useState } from "react";

function FrameDesign() {
  useRefreshWarning();

  const [unsplashBg, setUnsplashBg] = useState("");
  const [tab, setTab] = useState("gallery");

  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const options = [
    { name: "black", image: black },
    { name: "white", image: white },
    { name: "pink", image: pink },
    { name: "blue", image: blue },
  ];

  useEffect(() => {
    if (unsplashBg && unsplashBg !== frame.color) {
      setFrame((prevFrame) => ({ ...prevFrame, color: unsplashBg }));
    }
  }, [unsplashBg, setFrame, frame.color]);

  return (
    <div>
      <BackHeader />
      <section className="options-c">
        <h1>Choose frame</h1>
        <section className="options-r">
          <Frame
            images={frame.images}
            filter={frame.filter}
            layout={frame.layout}
            color={frame.color}
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
              <li
                className={tab == "unsplash" && "selected-tab"}
                onClick={() => {
                  setTab("unsplash");
                }}
              >
                Unsplash
              </li>
            </ul>
            {tab == "gallery" ? (
              <section>
                <p>Choose frame from gallery</p>
                <Options
                  options={options}
                  onClick={(option) => setFrame({ ...frame, color: option })}
                  selected={frame.color}
                />
              </section>
            ) : (
              <section>
                <p>Choose frame from Unsplash</p>
                <Unsplash setSelected={setUnsplashBg} />
              </section>
            )}
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
