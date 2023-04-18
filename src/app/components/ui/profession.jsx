import React from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import {
  getProfessionsByIds,
  // eslint-disable-next-line comma-dangle
  getProfessionsLoadingStatus,
} from "../../store/professions";

const Profession = ({ id }) => {
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  const prof = useSelector(getProfessionsByIds(id));
  if (!professionsLoading) {
    return <p>{prof.name}</p>;
  } else return "Loading...";
};
Profession.propTypes = {
  id: PropTypes.string,
};
export default Profession;
