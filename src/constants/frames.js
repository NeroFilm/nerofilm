export const defaultFrame = {
  layout: "original",
  images: [],
  allImages: [],
  filter: "default",
  design: "black",
};

export const frameSize = {
  original: {
    desktop: { height: 360, width: 120 },
    mobile: { height: 300, width: 100 }, 
  },
  wide: {
    desktop: { height: 360, width: 240 },
    mobile: { height: 300, width: 200 }, 
  },
};

export const frameImageSize = {
  original: {
    desktop: { imageHeight: 104, imageWidth: 78 },
    mobile: { imageHeight: 104, imageWidth: 78 }, 
  },
  wide: {
    desktop: { imageHeight: 104, imageWidth: 158 }, // adjusting later
    mobile: { imageHeight: 104, imageWidth: 158 }, //adjusting later
  },
};
