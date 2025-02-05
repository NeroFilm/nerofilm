function Frame({images, type}) {
  return (
    <div className={`frame frame-${type}`}>
      {
        images.map((image, index) => <img key={index} src={image} alt={`image ${index+1}`} />
        )
      }
    </div>
  )
}

export default Frame
