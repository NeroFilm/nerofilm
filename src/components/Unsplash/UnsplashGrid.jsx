import PropTypes from "prop-types";

function UnsplashGrid({ images, setSelected }) {
  return (
    <ul className="unsplash-grid">
      {images.map((photo) => {
        return (
          <li key={photo.id} onClick={() => setSelected(photo.urls.thumb)}>
            <img
              className="unsplash-img"
              alt={photo.alt_description}
              src={photo.urls.thumb}
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
