import { createSlice } from "@reduxjs/toolkit";

import { getUsers } from "./actions";
import { feature } from "./constants";

export const authSlice = createSlice({
  name: feature,
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {})
      .addCase(getUsers.pending, (state, action) => {})
      .addCase(getUsers.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
