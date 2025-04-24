import { useEffect } from "react";

function useCursorLabel() {
  useEffect(() => {
    const label = document.createElement("div");
    label.className = "hero-cursor-label";
    document.body.appendChild(label);

    let mouseX = 0,
      mouseY = 0;
    let labelX = 0,
      labelY = 0;

    const moveHandler = (e) => {
      mouseX = e.clientX + 24;
      mouseY = e.clientY + 16;

      const target = e.target.closest(".hero-img");
      if (target && target.dataset.label) {
        label.textContent = target.dataset.label;
        label.style.opacity = "1";
      } else {
        label.style.opacity = "0";
      }
    };

    const scrollHandler = () => {
      const el = document.elementFromPoint(mouseX - 24, mouseY - 16);
      const target = el?.closest(".hero-img");

      if (target && target.dataset.label) {
        label.textContent = target.dataset.label;
        label.style.opacity = "1";
      } else {
        label.style.opacity = "0";
      }
    };

    const updateLabelPosition = () => {
      const dx = mouseX - labelX;
      const dy = mouseY - labelY;
      const smoothing = 8;
      labelX += dx / smoothing;
      labelY += dy / smoothing;

      label.style.left = `${labelX}px`;
      label.style.top = `${labelY}px`;

      requestAnimationFrame(updateLabelPosition);
    };

    document.addEventListener("mousemove", moveHandler);
    window.addEventListener("scroll", scrollHandler);
    updateLabelPosition();

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("scroll", scrollHandler);
      document.body.removeChild(label);
    };
  }, []);
}

export default useCursorLabel;
