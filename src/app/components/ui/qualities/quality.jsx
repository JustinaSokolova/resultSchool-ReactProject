import React from "react";
import PropTypes from "prop-types";

const Quality = ({ _id, color, name }) => {
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};
Quality.propTypes = {
  _id: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
};

export default Quality;
