import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
