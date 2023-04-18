/* eslint-disable comma-dangle */
/* eslint-disable indent */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from "../../../store/users";

export const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  if (usersStatusLoading) return "Loading...";
  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
