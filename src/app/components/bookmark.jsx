import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
  return (
    <div className="d-flex justify-content-center">
      <button {...rest}
        className="btn border-0"
      >
        <i
          className={"bi " + (status ? "bi-heart-fill" : "bi-heart")}
        ></i>
      </button>
    </div>
  );
};

BookMark.propTypes = {
  onToggleBookmark: PropTypes.func,
  userId: PropTypes.string,
  status: PropTypes.bool,
};

export default BookMark;
