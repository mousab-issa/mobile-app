import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchedUser, fetchUsers } from "./actions";

import _ from "lodash";

import { feature } from "./constants";

const initialState: UserState = {
  users: [],
  searchedUser: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: feature,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = _.orderBy(action.payload, ["bananas"], ["desc"]);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "";
      })

      .addCase(fetchSearchedUser.fulfilled, (state, action) => {
        state.searchedUser = action.payload;
      });
  },
});

export default userSlice.reducer;
