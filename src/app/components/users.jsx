import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./paginationComp";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users, ...rest }) => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

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

  const filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;

  const count = filteredUsers.length;

  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <div className="d-flex">
      {professions
        ? (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList items={professions} selectedItem={selectedProf} onItemSelect={handleProfessionSelect} />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
          </div>
        )
        : (<p className="fs-4 m-4">Loading...</p>)
      }
      <div className="d-flex flex-column">
        {professions && <SearchStatus length={count} />}
        {count > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {userCrop.map((user) => (
                <User key={user._id} {...rest} {...user} />
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Users;
