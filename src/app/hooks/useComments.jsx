import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments();
  }, [userId]);

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId,
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComment(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function removeComment(id) {
    console.log(id);
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) => prevState.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  return (
    <CommentsContext.Provider
      value={{ comments, isLoading, createComment, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
