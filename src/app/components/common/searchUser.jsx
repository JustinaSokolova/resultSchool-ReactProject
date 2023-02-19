import React from "react";
import PropTypes from "prop-types";

const SearchUser = ({ onChange, value }) => {
  return (
    <div>
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Search..."
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchUser;

SearchUser.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
