import { createSlice } from "@reduxjs/toolkit";

const archiveSlice = createSlice({
  name: "archive",
  initialState: [],
  reducers: {
    addOrderToArchive: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addOrderToArchive } = archiveSlice.actions;

export default archiveSlice.reducer;
