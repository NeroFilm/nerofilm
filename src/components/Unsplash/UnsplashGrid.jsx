import PropTypes from "prop-types";

function UnsplashGrid({ images, setSelected }) {
  const handlePhotoUse = async (photoId) => {
    try {
      const res = await fetch(
        `https://nerofilm-backend.vercel.app/api/unsplash/download?photoId=${photoId}`
      );
      console.log("Download triggered for photoId:", photoId);
      console.log(res);
    } catch (error) {
      console.error("Error triggering download:", error);
    }
  };

  return (
    <ul className="unsplash-grid">
      {images.map((photo) => {
        return (
          <li
            key={photo.id}
            onClick={() => {
              setSelected(photo.urls.regular);
              handlePhotoUse(photo.id);
            }}
          >
            <img
              className="unsplash-img"
              alt={photo.alt_description}
              src={photo.urls.regular}
            />
            <p className="unsplash-attr">
              by{" "}
              <a target="_blank" href={photo.links.html}>
                {photo.user.first_name && photo.user.first_name}
                {photo.user.last_name && ` ${photo.user.last_name}`}{" "}
              </a>
            </p>
          </li>
        );
      })}
    </ul>
  );
}

UnsplashGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      alt_description: PropTypes.string,
      urls: PropTypes.shape({
        thumb: PropTypes.string.isRequired,
      }).isRequired,
      links: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }).isRequired,
      user: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default UnsplashGrid;
