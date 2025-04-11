import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { useFrame } from "../../hooks/useFrame";
import BackHeader from "../../components/BackHeader/BackHeader";
import Options from "../../components/Options/Options";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import Frame from "../../components/Frame/Frame";
import print from "../../assets/options/print.svg";
import share from "../../assets/options/share.svg";
import { generateAndDownloadTimelapse } from "../../utils/generateTimelapse";
import "./index.css";

function Download() {
  useRefreshWarning();

  const frame = useFrame();
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const [frameImage, setFrameimage] = useState("");
  const [loading, setLoading] = useState(false);

  const options = [
    { name: "share", image: share },
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
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
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
          <img id="printImage" src="${frameImage}" alt="Printable" />
          <script>
            const image = document.getElementById('printImage');
            image.onload = function () {
              setTimeout(() => {
                window.focus();
                window.print();
              }, 250);
            };
          </script>
        </body>
      </html>
    `);
    doc.close();
  };

  const shareImage = async () => {
    if (!frameRef.current) return;

    try {
      const dataUrl = await toPng(frameRef.current, {
        cacheBust: true,
        width: frameRef.current.offsetWidth * 4,
        height: frameRef.current.offsetHeight * 4,
        style: {
          transform: "scale(4)",
          transformOrigin: "top left",
        },
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "nerofilm.png", { type: blob.type });

      const shareData = {
        title: "NeroFilm",
        files: [file],
        text: "Check out my photo strip! ✨ Take your own at https://nerofilm.co 📸",
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        const link = document.createElement("a");
        link.download = "nerofilm.png";
        link.href = dataUrl;
        link.click();
        alert("Sharing not supported — image downloaded instead.");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleShare = (option) => {
    switch (option) {
      case "share":
        shareImage();
        break;
      case "print":
        printImage();
        break;
    }
  };

  return (
    <div>
      <BackHeader />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>{" "}
      {/* Hidden canvas */}
      <section className="options-c">
        <h1 className="options-heading">Download & Share</h1>
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
            onClick={(option) => handleShare(option.name)}
            selected={frame.filter}
          />
        </section>

        <section className="btns">
          <button className="btn" onClick={downloadImage}>
            Download Image
          </button>
          <button
            className="btn btn-secondary"
            onClick={() =>
              generateAndDownloadTimelapse(
                frame.allImages || frame.images,
                canvasRef,
                setLoading
              )
            }
            disabled={loading}
          >
            {loading ? "Generating Timelapse..." : "Download Timelapse"}
          </button>
        </section>
      </section>
    </div>
  );
}

export default Download;
