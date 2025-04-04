export const generateAndDownloadTimelapse = async (images, canvasRef, setLoading) => {
  if (!images || images.length === 0) {
    alert("No photos found.");
    return;
  }

  setLoading(true);
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  const firstImage = new Image();
  firstImage.src = images[0];

  firstImage.onload = async () => {
    canvas.width = firstImage.width;
    canvas.height = firstImage.height;

    const stream = canvas.captureStream();
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "timelapse.webm";
      link.click();
      URL.revokeObjectURL(url);
      setLoading(false);
    };

    recorder.start();

    const selectedImages = images.slice(0, 16); 
    for (let i = 0; i < selectedImages.length; i++) {
      const img = new Image();
      img.src = selectedImages[i];
      await new Promise((resolve) => {
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setTimeout(resolve, 300);
        };
      });
    }

    recorder.stop();
  };
};
