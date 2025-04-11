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

// Detect if browser is Safari
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

function Download() {
  useRefreshWarning();

  const frame = useFrame();
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const [frameImage, setFrameimage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [frameRendered, setFrameRendered] = useState(false);

  const options = [
    { name: "share", image: share },
    { name: "print", image: print },
  ];

  // When the component mounts, prepare for rendering
  useEffect(() => {
    if (frameRef.current) {
      // Give the frame time to fully render
      setTimeout(() => {
        setFrameRendered(true);
      }, 500);
    }
  }, []);

  // Once the frame is rendered, generate the image
  useEffect(() => {
    if (!frameRendered || !frameRef.current) return;

    const generateImage = async () => {
      setLoading(true);
      setStatusMessage("Preparing images...");

      try {
        // For Safari/iOS, use a different approach
        if (isSafari || isiOS) {
          setStatusMessage("Optimizing for Safari...");
          await captureFrameForSafari();
        } else {
          // Standard approach for other browsers
          setStatusMessage("Generating image...");
          const dataUrl = await toPng(frameRef.current, {
            cacheBust: true,
            width: frameRef.current.offsetWidth * 4,
            height: frameRef.current.offsetHeight * 4,
            style: {
              transform: "scale(4)",
              transformOrigin: "top left",
            },
          });
          setFrameimage(dataUrl);
        }

        setStatusMessage("Ready to download!");
      } catch (error) {
        console.error("Error generating image:", error);
        setStatusMessage("Error: Could not generate image. Try again.");

        // Fallback for any browser if main method fails
        try {
          setStatusMessage("Trying alternative method...");
          await captureFrameForSafari();
        } catch (fallbackError) {
          console.error("Fallback method also failed:", fallbackError);
          setStatusMessage("Error: All generation methods failed.");
        }
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, [frameRendered]);

  // Special method for Safari to capture frames
  const captureFrameForSafari = async () => {
    return new Promise((resolve, reject) => {
      try {
        // Wait a bit longer for Safari
        setTimeout(() => {
          if (!frameRef.current) {
            reject(new Error("Frame reference not available"));
            return;
          }

          // Get frame dimensions and position
          const frameEl = frameRef.current;
          const rect = frameEl.getBoundingClientRect();

          // Create a canvas for rendering
          const canvas = document.createElement("canvas");
          const scale = 2; // Scale factor for higher quality
          canvas.width = rect.width * scale;
          canvas.height = rect.height * scale;

          const ctx = canvas.getContext("2d");

          // Fill with white background
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw all images manually
          const drawImagesDirectly = async () => {
            // Set scale
            ctx.scale(scale, scale);

            // Get all images including the frame background, photos, and stickers
            const allImages = Array.from(frameEl.querySelectorAll("img"));

            // Process each image
            for (const imgEl of allImages) {
              try {
                const imgRect = imgEl.getBoundingClientRect();

                // Calculate position relative to frame
                const relativeX = imgRect.left - rect.left;
                const relativeY = imgRect.top - rect.top;

                // Create a new image to ensure it's loaded
                const img = new Image();

                // Wait for the image to load
                await new Promise((imgResolve, imgReject) => {
                  img.onload = imgResolve;
                  img.onerror = imgReject;
                  img.crossOrigin = "anonymous"; // Try to avoid CORS issues
                  img.src = imgEl.src;
                });

                // Draw the image at its position
                ctx.drawImage(
                  img,
                  relativeX,
                  relativeY,
                  imgRect.width,
                  imgRect.height
                );
              } catch (imgError) {
                console.warn("Failed to draw image:", imgError);
                // Continue with other images even if one fails
              }
            }

            // Add any text elements
            const textElements = Array.from(
              frameEl.querySelectorAll("p, h1, h2, h3, span")
            );
            for (const textEl of textElements) {
              try {
                const textRect = textEl.getBoundingClientRect();

                // Calculate position relative to frame
                const relativeX = textRect.left - rect.left;
                const relativeY = textRect.top - rect.top;

                // Get text styles
                const computedStyle = window.getComputedStyle(textEl);
                ctx.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
                ctx.fillStyle = computedStyle.color;
                ctx.textBaseline = "top";

                // Draw the text
                ctx.fillText(textEl.textContent, relativeX, relativeY);
              } catch (textError) {
                console.warn("Failed to draw text:", textError);
              }
            }

            // Convert to data URL and set state
            const dataUrl = canvas.toDataURL("image/png");
            setFrameimage(dataUrl);
            resolve(dataUrl);
          };

          drawImagesDirectly().catch(reject);
        }, 1000); // Longer delay for Safari
      } catch (error) {
        reject(error);
      }
    });
  };

  const downloadImage = () => {
    if (!frameImage) {
      setStatusMessage("Image not ready yet. Please wait...");

      // If the image isn't ready yet, try to generate it immediately
      if (frameRendered && !loading) {
        setLoading(true);
        captureFrameForSafari()
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error("Failed to generate image on demand:", error);
            setLoading(false);
            setStatusMessage("Failed to generate image. Please try again.");
          });
      }
      return;
    }

    // Download the image
    try {
      // For iOS Safari, we need a different approach
      if (isiOS) {
        // Open the image in a new tab
        window.open(frameImage, "_blank");
        setStatusMessage("Image opened in new tab. Long-press to save.");
      } else {
        // Normal download for other browsers
        const link = document.createElement("a");
        link.download = "nerofilm.png";
        link.href = frameImage;
        link.click();
        setStatusMessage("Download started!");
      }
    } catch (error) {
      console.error("Download failed:", error);
      setStatusMessage("Download failed. Try opening in new tab.");

      // Fallback: open in new tab
      window.open(frameImage, "_blank");
    }
  };

  const printImage = () => {
    if (!frameImage) {
      setStatusMessage("Image not ready yet. Please wait...");
      return;
    }

    try {
      setStatusMessage("Preparing for print...");

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
              image.onload = function() {
                setTimeout(() => {
                  window.focus();
                  window.print();
                  setTimeout(() => {
                    window.parent.document.body.removeChild(window.frameElement);
                  }, 1000);
                }, 1000); // Long delay for Safari
              };
            </script>
          </body>
        </html>
      `);
      doc.close();

      setStatusMessage("Print dialog should open soon...");
    } catch (error) {
      console.error("Print failed:", error);
      setStatusMessage("Printing failed. Try downloading first.");
    }
  };

  const shareImage = async () => {
    if (!frameImage) {
      setStatusMessage("Image not ready yet. Please wait...");
      return;
    }

    try {
      setStatusMessage("Preparing to share...");
      setLoading(true);

      // Get blob from data URL
      const fetchResponse = await fetch(frameImage);
      const blob = await fetchResponse.blob();
      const file = new File([blob], "nerofilm.png", { type: blob.type });

      const shareData = {
        title: "NeroFilm",
        files: [file],
        text: "Check out my photo strip! ✨ Take your own at https://nerofilm.co 📸",
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        setStatusMessage("Shared successfully!");
      } else {
        // Fallback to download
        const link = document.createElement("a");
        link.download = "nerofilm.png";
        link.href = frameImage;
        link.click();
        setStatusMessage("Sharing not supported — image downloaded instead.");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      setStatusMessage("Sharing failed. Try downloading instead.");
    } finally {
      setLoading(false);
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
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
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

        {statusMessage === "Download failed. Try opening in new tab." && (
          <p
            className="status-message"
            style={{
              textAlign: "center",
              margin: "10px 0",
              color: statusMessage.includes("Error") ? "red" : "green",
            }}
          >
            {statusMessage}
          </p>
        )}

        <section className="btns">
          <button className="btn" onClick={downloadImage} disabled={loading}>
            {loading ? "Preparing Image..." : "Download Image"}
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
            {loading ? "Generating..." : "Download Timelapse"}
          </button>
        </section>

        {isSafari && (
          <p
            style={{
              textAlign: "center",
              margin: "10px 0",
              fontSize: "0.9em",
              opacity: 0.8,
            }}
          >
            Safari detected: Using optimized rendering mode
          </p>
        )}
      </section>
    </div>
  );
}

export default Download;
