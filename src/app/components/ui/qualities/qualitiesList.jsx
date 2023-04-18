import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";

import Quality from "./quality";
import {
  getQualitiesByIds,
  // eslint-disable-next-line comma-dangle
  getQualitiesLoadingStatus,
  // eslint-disable-next-line comma-dangle
  loadQualitiesList,
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  if (qualitiesLoading) return "Loading...";
  return (
    <>
      {qualitiesList.map((qual) => (
        <Quality key={qual._id} {...qual} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QualitiesList;
