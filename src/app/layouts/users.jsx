import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  return (
    <>
      {userId ? (
        edit ? (
          <UserEditPage />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
