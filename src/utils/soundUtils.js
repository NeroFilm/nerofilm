import ClickSound from "../assets/sounds/MouseClick.mp3";

export const playClickSound = () => {
  const sound = new Audio(ClickSound);
  sound.play();
};
