import { Alert } from "react-native";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { feature } from "./constants";
import { getInstance } from "../../services/axios";

const axios = getInstance();

export const fetchUsers = createAsyncThunk(
  `${feature}/fetchUsers`,
  async () => {
    const response: AxiosResponse<UserDataPayload> = await axios.get("/users");
    const users = response.data.data;
    return _.values(users);
  }
);

export const fetchSearchedUser = createAsyncThunk(
  `${feature}/fetchSearchedUser`,
  async ({ input }: { input: string }) => {
    const response: AxiosResponse<UserDataPayload> = await axios.get("/users", {
      params: { query: input },
    });

    if (!response.data.data.length) {
      Alert.alert("No user found");

      return;
    }

    const user = response.data.data;
    return _.values(user)[0];
  }
);
