import { useFrame, useFrameUpdate } from "../../hooks/useFrame";
import Frame from "../../components/Frame/Frame";
import { Link } from "react-router-dom";
import BackHeader from "../../components/BackHeader/BackHeader";
import lipstick from "../../assets/options/lipstick.jpg";
import Options from "../../components/Options/Options";
import useRefreshWarning from "../../hooks/useRefreshWarning";

function Filter() {
  useRefreshWarning();

  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const options = [
    { name: "default", image: lipstick },
    { name: "bw", image: lipstick },
    { name: "vintage", image: lipstick },
    { name: "beauty", image: lipstick },
  ];

  return (
    <div>
      <BackHeader />
      <section className="options-c">
        <h1 className="options-heading">Add Filter</h1>
        <section className="options-r">
          <Frame
            layout={frame.layout}
            filter={frame.filter}
            images={frame.images}
            design={frame.design}
          />
          <div className="options-box">
            <p className="options-box-label">Filter</p>
            <Options
              options={options}
              onClick={(option) => setFrame({ ...frame, filter: option.name })}
              selected={frame.filter}
              isFilter={true}
            />
          </div>
        </section>
        <Link to="/sticker" role="button">
          <button className="btn">Continue</button>
        </Link>
      </section>
    </div>
  );
}

export default Filter;
