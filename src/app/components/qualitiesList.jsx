import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qual) => (
        <Qualities {...qual} key={qual._id} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QualitiesList;
