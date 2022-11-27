import React from "react";
import PropTypes from "prop-types";

const BookMark = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn border-0"
        onClick={() => props.onToggleBookmark(props.userId)}
      >
        <i
          className={"bi " + (props.bookmark ? "bi-heart-fill" : "bi-heart")}
        ></i>
      </button>
    </div>
  );
};

BookMark.propTypes = {
  onToggleBookmark: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired,
};

export default BookMark;
