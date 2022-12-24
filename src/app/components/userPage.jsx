import React, { useState, useEffect } from "react";
import api from "../api";
import QualitiesList from "./qualitiesList";
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
    history.push("/users");
  };

  return (user
    ? (<div className="p-3 m-3">
      <h3>{user.name}</h3>
      <p>Профессия: {user.profession.name}</p>
      <p>
        Качества: <QualitiesList qualities={user.qualities} />
      </p>
      <p>Встретился, раз: {user.completedMeetings}</p>
      <p>Оценка: {user.rate} / 5</p>
      <button onClick={handleUsers} type="button" className="btn btn-primary">Все пользователи</button>
    </div>
    )
    : <p className="fs-4 m-4">Loading...</p>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string,
};
export default UserPage;
