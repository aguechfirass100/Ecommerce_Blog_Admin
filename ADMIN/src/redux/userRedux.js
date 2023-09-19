import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // lOGIN
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // LOGOUT
    logout: (state) => {
      state.currentUser = null;
    },
    clearUserState: (state) => {
      state.currentUser = null
      state.isFetching = false
      state.error = false
    },
    // GET USERS
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // ADD USER
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPDATE USER
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user._id === updatedUser._id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE USER
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearUserState,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
