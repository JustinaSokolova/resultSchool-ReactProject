import React, { useState, useEffect } from "react";
import api from "../../../api";
import QualitiesList from "../../ui/qualities";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const UserPage = () => {
  const [user, setUser] = useState();
  const params = useParams();
  const { userId } = params;
  const history = useHistory();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleUsers = () => {
    history.push(`${history.location.pathname}/edit`);
  };

  return user
    ? (
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column p-4 m-3 shadow w-25">
          <h3>{user.name}</h3>
          <p>Профессия: {user.profession.name}</p>
          <p>
            Качества: <QualitiesList qualities={user.qualities} />
          </p>
          <p>Встретился, раз: {user.completedMeetings}</p>
          <p>Оценка: {user.rate} / 5</p>
          <button onClick={handleUsers} type="button" className="btn btn-outline-primary align-self-center">
            Изменить
          </button>
        </div>
      </div>
    )
    : (
      <p className="d-flex justify-content-center fs-4 m-4">Loading...</p>
    );
};

UserPage.propTypes = {
  userId: PropTypes.string,
};
export default UserPage;
