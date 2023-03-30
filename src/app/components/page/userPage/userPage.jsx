import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);

  return user ? (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user}></UserCard>
          <QualitiesCard data={user.qualities}></QualitiesCard>
          <MeetingsCard number={user.completedMeetings}></MeetingsCard>
        </div>
        <div className="col-md-8">
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
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
