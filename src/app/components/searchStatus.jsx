import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    let text = "";
    const numberUsers = String(number);
    (numberUsers.endsWith("2") ||
      numberUsers.endsWith("3") ||
      numberUsers.endsWith("4")) &&
    !numberUsers.endsWith("12")
      ? (text = length + " человека тусанут с тобой сегодня")
      : (text = length + " человек тусанет с тобой сегодня");
    return text;
  };

  return (
    <>
      <h2>
        <span className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}>
          {length > 0 ? renderPhrase(length) : "Никто с тобой не тусанет"}
        </span>
      </h2>
    </>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SearchStatus;
