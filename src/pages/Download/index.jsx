import Frame from "../../components/Frame/Frame"
import { useFrame } from "../../hooks/FrameContext"
import BackHeader from "../../components/BackHeader/BackHeader";
import "./index.css"
import { toPng } from "html-to-image";
import { useRef } from "react";
import { Link } from "react-router-dom";

function Download() {
  const frame = useFrame();
  const frameRef = useRef(null);

  const downloadImage = () => {
    toPng(frameRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "nerofilm.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <BackHeader />
      <section className="options-c">
        <h1>Download & share</h1>
        <section className="options-r">
          <div ref={frameRef}>
            <Frame
              images={frame.images}
              filter={frame.filter}
              layout={frame.layout}
              color={frame.color}
            />
          </div>
        </section>
        <sections className="btns">
          <button onClick={() => downloadImage()}>Download image</button>
          <Link to={"/"}>Return home</Link>
          {/* <button>Print image</button> */}
        </sections>
      </section>
    </div>
  );
}

export default Download
