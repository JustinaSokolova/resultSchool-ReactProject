import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== id));
  };

  const handleToggleBookmark = (id) => {
    const favoriteUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(favoriteUsers);
  };

  return (
    <>
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
      />
    </>
  );
}

export default App;
