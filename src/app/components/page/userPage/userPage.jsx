import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = () => {
  const [user, setUser] = useState();
  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  return user ? (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user}></UserCard>
          <QualitiesCard data={user.qualities}></QualitiesCard>
          <MeetingsCard number={user.completedMeetings}></MeetingsCard>
        </div>
        <div className="col-md-8">
          <Comments />
        </div>
      </div>
    </div>
  ) : (
    <p className="d-flex justify-content-center fs-4 m-4">Loading...</p>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string,
};
export default UserPage;
