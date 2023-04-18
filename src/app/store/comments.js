import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentRemove: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
  },
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceved,
  commentsRequesFailed,
  commentCreated,
  commentRemove,
} = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const createCommentFailed = createAction("comments/createCommentFailed");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentCommentFailed = createAction("comments/commentCommentFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComment(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequesFailed(error.message));
  }
};

export const createComment = (comment) => async (dispatch) => {
  dispatch(commentCreateRequested());
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(createCommentFailed(error.message));
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  dispatch(commentRemove(commentId));
  try {
    const { content } = await commentService.removeComment(commentId);
    if (content === null) {
      dispatch(commentRemoveRequested(content));
    }
  } catch (error) {
    dispatch(commentCommentFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
