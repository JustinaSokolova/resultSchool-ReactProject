import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onRemove }) => {
  return comments.map((comment) => (
    <Comment key={comment._id} {...comment} onRemove={onRemove}></Comment>
  ));
};

CommentsList.prototype = {
  comments: PropTypes.array,
  onRemove: PropTypes.func,
};

export default CommentsList;
