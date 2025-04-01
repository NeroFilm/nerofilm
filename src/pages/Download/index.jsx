import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { useNavigate } from "react-router-dom";
import { useFrame } from "../../hooks/FrameContext";
import WhiteBackHeader from "../../components/WhiteBackHeader/WhiteBackHeader";
import Options from "../../components/Options/Options";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import Frame from "../../components/Frame/Frame";
import print from "../../assets/logos/print.svg";
import share from "../../assets/logos/share.svg";
import "./index.css";

function Download() {
  useRefreshWarning();

  const frame = useFrame();
  const frameRef = useRef(null);
  const navigate = useNavigate();
  const [frameImage, setFrameimage] = useState("");

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

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
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

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "NeroFilm",
          text: "Check out my photo strip!",
          files: [file],
        });
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
          <button className="btn" onClick={downloadImage}>
            Download image
          </button>
          <button className="btn" onClick={() => navigate("/timelapse")}>
            Try Timelapse
          </button>
          <a
            href={`https://buy.stripe.com/test_dR6eVV79J8X33pS3cc?client_reference_id=test`}
            className="btn btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Buy photo strip
          </a>
        </section>
      </section>
    </div>
  );
}

export default Download;
