import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import { Link } from "react-router-dom";
import WhiteBackHeader from "../../components/WhiteBackHeader/WhiteBackHeader";
import dft from "../../assets/options/default.svg";
import bw from "../../assets/options/bw.svg";
import vintage from "../../assets/options/vintage.svg"; 
import beauty from "../../assets/options/beauty.svg";
import Options from "../../components/Options/Options";
import useRefreshWarning from "../../hooks/useRefreshWarning";

function Filter() {
  useRefreshWarning();

  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const options = [
    { name: "default", image: dft },
    { name: "bw", image: bw },
    { name: "vintage", image: vintage },
    { name: "beauty", image: beauty },
  ];

  return (
    <div>
      <WhiteBackHeader />
      <section className="options-c">
        <h1 className="options-heading">Add filter</h1>
        <section className="options-r">
          <Frame
            layout={frame.layout}
            filter={frame.filter}
            images={frame.images}
            design={frame.design}
          />
          <div className="options-box">
            <p className="options-box-label">Filters</p>
            <Options
              options={options}
              onClick={(option) => setFrame({ ...frame, filter: option })}
              selected={frame.filter}
            />
          </div>
        </section>
        <Link className="btn" to="/sticker" role="button">
          Continue
        </Link>
      </section>
    </div>
  );
}

export default Filter;
