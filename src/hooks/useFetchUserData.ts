import { useState, useEffect } from "react";
import { getInstance } from "../services/axios";
import _ from "lodash";

const axios = getInstance();

export const useFetchUserData = () => {
  const [userData, setUserData] = useState<UserData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/users");
      const users = response.data.data;

      const usersArray: UserData[] = _.values(users);
      setUserData(usersArray);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return userData;
};
