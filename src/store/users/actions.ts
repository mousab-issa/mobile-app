import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { feature } from "./constants";

export const getUsers = createAsyncThunk(
  `${feature}/getUsers`,
  async ({}: { email: string; password: string }, thunkAPI) => {}
);
