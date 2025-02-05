function Frame({images, layout, color}) {
  return (
    <div className={`frame frame-${layout} frame-${color}`}>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`image ${index + 1}`} />
      ))}
    </div>
  );
}

export default Frame
