import Frame from "../../components/Frame/Frame";
import { useFrame } from "../../hooks/FrameContext";
import WhiteBackHeader from "../../components/WhiteBackHeader/WhiteBackHeader";
import "./index.css";
import { toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import Options from "../../components/Options/Options";

import TikTok from "../../assets/logos/TikTok.svg";
import Instagram from "../../assets/logos/Instagram.svg";
import print from "../../assets/logos/print.svg";

function Download() {
  useRefreshWarning();

  const frame = useFrame();
  const frameRef = useRef(null);
  const [frameImage, setFrameimage] = useState("");

  // update print and share icon designs
  const options = [
    { name: "Instagram", image: Instagram },
    { name: "TikTok", image: TikTok },
    { name: "print", image: print },
  ];

  useEffect(() => {
    toPng(frameRef.current, {
      cacheBust: false,
      width: frameRef.current.offsetWidth * 4,
      height: frameRef.current.offsetHeight * 4,
      style: {
        transform: "scale(4)",
        transformOrigin: "top left",
      },
    }).then((dataUrl) => {
      setFrameimage(dataUrl);
    });
  }, []);

  const downloadImage = () => {
    const link = document.createElement("a");
    link.download = "nerofilm.png";
    link.href = frameImage;
    link.click();
  };

  const printImage = () => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
    <html>
      <head>
        <title>Print Image</title>
        <style>
          @page {
            size: letter;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          img {
            width: ${frame.layout === "original" ? "2" : "4"}in;
            height: 6in;
            position: absolute;
            top: 0;
            left: 0;
          }
        </style>
      </head>
      <body>
        <img src="${frameImage}" alt="Printable" />
      </body>
    </html>
  `);
    doc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  // todo : handle ig / tiktok share
  const handleShare = (option) => {
    switch (option) {
      // sharing should upload film to story
      case "Instagram":
        break;
      // sharing should upload timelapse
      case "TikTok":
        break;
      case "print":
        printImage();
        break;
    }
  };

  return (
    <div>
      <WhiteBackHeader />
      <section className="options-c">
        <h1 className="options-heading">Download & share</h1>
        <section className="options-r">
          <div ref={frameRef} style={{ display: "inline-block" }}>
            <Frame
              images={frame.images}
              filter={frame.filter}
              layout={frame.layout}
              design={frame.design}
              stickers={frame.stickers}
            />
          </div>
          <Options
            options={options}
            onClick={(option) => handleShare(option)}
            selected={frame.filter}
          />
        </section>
        <section className="btns">
          <button className="btn" onClick={() => downloadImage()}>
            Download image
          </button>
          <a
            href={`https://buy.stripe.com/test_dR6eVV79J8X33pS3cc?client_reference_id=${"test"}`}
            className="btn btn-secondary"
            target="_blank"
          >
            Buy photo strip
          </a>
          {/* <Link className="btn btn-secondary" role="button" to={"/"}>
            Return home
          </Link> */}
        </section>
      </section>
    </div>
  );
}

export default Download;
