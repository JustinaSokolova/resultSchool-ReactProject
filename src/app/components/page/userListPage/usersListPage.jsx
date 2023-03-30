/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import Pagination from "../../common/paginationComp";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";

import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/userTable";
import _ from "lodash";
import SearchUser from "../../common/searchUser";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
  const { users } = useUser();
  const { currentUser } = useAuth();
  const { professions, isLoading: professionsLoading } = useProfessions();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchInput, setSearchInput] = useState("");
  const pageSize = 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchInput]);

  const handleProfessionSelect = (items) => {
    if (searchInput !== "") setSearchInput("");
    setSelectedProf(items);
  };

  const handleDelete = (id) => {
    // setUsers((prevState) => prevState.filter((item) => item._id !== id));
    console.log(id);
  };

  const handleToggleBookmark = (id) => {
    const favoriteUsers = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    // setUsers(favoriteUsers);
    console.log(favoriteUsers);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setSelectedProf(undefined);
  };

  if (users) {
    function filterUsers(data) {
      const filteredUsers = searchInput
        ? data.filter((user) =>
            user.name.toLowerCase().includes(searchInput.toLowerCase())
          )
        : selectedProf
        ? data.filter((user) => user.profession === selectedProf._id)
        : data;

      return filteredUsers.filter((user) => user._id !== currentUser._id);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <>
        <div className="d-flex justify-content-center m-3 mx-auto w-75">
          {professions && !professionsLoading && (
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
          )}
          <div className="d-flex flex-column w-75">
            {professions && <SearchStatus length={count} />}
            <SearchUser onChange={handleSearch} value={searchInput} />
            {count > 0 && (
              <UserTable
                users={userCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookmark}
              />
            )}
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
  }
  return <p className="d-flex justify-content-center fs-4 m-4">Loading...</p>;
};

UsersListPage.propTypes = {
  users: PropTypes.array,
};

export default UsersListPage;
