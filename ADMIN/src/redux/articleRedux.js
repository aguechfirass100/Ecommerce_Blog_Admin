import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    isFetching: false,
    error: false,
    emptyInputsError: false,
    wrongTypeError: false,
  },
  reducers: {
    //GET ALL
    getArticleStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getArticleSuccess: (state, action) => {
      state.isFetching = false;
      state.articles = action.payload;
    },
    getArticleFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteArticleStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteArticleSuccess: (state, action) => {
      state.isFetching = false;
      state.articles.splice(
        state.articles.findIndex((item) => item._id === action.payload),
        1      //finds the index of the item with a specific _id in the state.articles array and removes it
      );
    },
    deleteArticleFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateArticleStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateArticleSuccess: (state, action) => {
      state.isFetching = false;
      state.articles[
        state.articles.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.article;
    },
    updateArticleFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addArticleStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addArticleSuccess: (state, action) => {
      state.isFetching = false;
      state.articles.push(action.payload);
    },
    addArticleFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Tests
    emptyFieldFailure: (state) => {
      state.isFetching = false;
      state.emptyInputsError = true;
    },
    fieldTypeFailure: (state) => {
      state.isFetching = false;
      state.wrongTypeError = true;
    },
  },
});

export const {
  getArticleStart,
  getArticleSuccess,
  getArticleFailure,
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailure,
  updateArticleStart,
  updateArticleSuccess,
  updateArticleFailure,
  addArticleStart,
  addArticleSuccess,
  addArticleFailure,
  emptyFieldFailure,
  fieldTypeFailure,
} = articleSlice.actions;

export default articleSlice.reducer;