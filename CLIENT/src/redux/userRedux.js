import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        reducers: {
            //login
            loginStart: (state) => {
                state.isFetching = true
            },
            loginSuccess: (state, action) => {
                state.isFetching = false
                state.currentUser = action.payload
            },
            loginFailure: (state) => {
                state.isFetching = false
                state.error = true
            },
            //register
            registerStart: (state) => {
                state.isFetching = true
              },
              registerSuccess: (state, action) => {
                state.isFetching = false
                state.currentUser = action.payload
              },
              registerFailure: (state) => {
                state.isFetching = false
                state.error = true
              },
            //logout
            logOut: (state) => {
                state.currentUser = null
            },
            clearUserState: (state) => {
                state.currentUser = null
                state.isFetching = false
                state.error = false
            }
        }
    }
)

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logOut, clearUserState } = userSlice.actions
export default userSlice.reducer