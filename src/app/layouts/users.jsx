import React, { useState, useEffect } from "react";
import Pagination from "../components/paginationComp";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "../components/groupList";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/userTable";
import _ from "lodash";

const Users = () => {
  const pageSize = 4;
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iterator: "name", order: "asc" });

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== id));
  };

  const handleToggleBookmark = (id) => {
    const favoriteUsers = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(favoriteUsers);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (items) => {
    setSelectedProf(items);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <>
        <div className="d-flex m-3">
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
          <div className="d-flex flex-column">
            {professions && <SearchStatus length={count} />}
            {count > 0 && <UserTable users={userCrop}
              onSort={handleSort} selectedSort={sortBy}
              onDelete={handleDelete} onToggleBookmark={handleToggleBookmark} />}
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </>
    );
  } return (
    <p className="fs-4 m-4">Loading...</p>
  );
};

Users.propTypes = {
  users: PropTypes.array,
};

export default Users;
