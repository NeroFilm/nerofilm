import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import { Link } from "react-router-dom";
import BackHeader from "../../components/BackHeader/BackHeader";
import dft from "../../assets/options/default.svg";
import bw from "../../assets/options/bw.svg";
import vintage from "../../assets/options/bw.svg"; // needs .svg
import beauty from "../../assets/options/bw.svg"; // needs .svg
import Options from "../../components/Options/Options";
import useRefreshWarning from "../../hooks/useRefreshWarning";

function AddFilter() {
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
      <BackHeader />
      <section className="options-c">
        <h1>Add filter</h1>
        <section className="options-r">
          <Frame
            layout={frame.layout}
            filter={frame.filter}
            images={frame.images}
            color={frame.color}
          />
          <Options
            options={options}
            onClick={(option) => setFrame({ ...frame, filter: option })}
            selected={frame.filter}
          />
        </section>
        <Link className="btn" to="/add-sticker" role="button">
          Continue
        </Link>
      </section>
    </div>
  );
}

export default AddFilter;
