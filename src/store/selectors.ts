import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";

import { RootState } from ".";

export const getSoundStatus = (state: RootState) =>
  state.mediaSlice.trackStatus;

export const getPlayListById = (state: RootState) =>
  state.mediaSlice.trackStatus;

const selectSelf = (state: RootState) => state;
