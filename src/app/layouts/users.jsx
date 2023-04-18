import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage";

import UsersLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <UsersLoader>
      {userId ? (
        edit ? (
          userId === currentUserId ? (
            <UserEditPage />
          ) : (
            <Redirect to={`/users/${currentUserId}/edit`} />
          )
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </UsersLoader>
  );
};

export default Users;
