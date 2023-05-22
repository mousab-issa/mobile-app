import { useState, useEffect } from "react";
import { getInstance } from "../services/axios";
import _ from "lodash";

const axios = getInstance();

export const useFetchUserData = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [searchedUser, setSearchedUser] = useState<UserData | null>(null);

  const fetchData = async (input?: string) => {
    try {
      const response = await axios.get("/users");
      const users = response.data.data;
      const usersArray: UserData[] = _.values(users);
      setUserData(usersArray);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSearchedUser = async (input: string) => {
    try {
      const response = await axios.get("/users", { params: { query: input } });
      const user = response.data.data;
      const searchedUser = _.values(user)[0];
      setSearchedUser(searchedUser);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { userData, searchedUser, fetchSearchedUser };
};
