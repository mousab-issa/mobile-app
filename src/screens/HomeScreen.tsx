import React, { useState, useEffect } from "react";
import { TextInput, Button, View, Alert, StyleSheet } from "react-native";
import { Table, Row, Rows } from "../components";
import { Screen } from "../components/Screen";
import _ from "lodash";
import { getInstance } from "../services/axios";

interface UserData {
  uid: string;
  name: string;
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  stars: number;
  subscribed: boolean;
}

interface TableRow {
  name: string;
  rank: number;
  bananas: number;
  isSearchedUser: string;
}

const axios = getInstance();

export const HomeScreen = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [input, setInput] = useState<string>("");

  const tableHead = ["Name", "Rank", "Number of bananas", "isSearchedUser?"];

  const fetchData = async () => {
    try {
      const response = await axios.get("/data");
      const users = response.data;

      const usersArray: UserData[] = _.values(users);

      setUserData(usersArray);

      const topUsers = _.take(_.orderBy(usersArray, ["bananas"], ["desc"]), 10);

      updateTableData(topUsers);
    } catch (err) {
      console.error(err);
    }
  };

  const onSearch = () => {
    if (!input) return;

    const sortedUsers = _.orderBy(userData, ["bananas"], ["desc"]);

    const searchedUser = _.find(sortedUsers, (user: UserData) =>
      _.includes(_.toLower(user.name), _.toLower(input))
    );

    if (!searchedUser) {
      Alert.alert(
        "This user name does not exist! Please specify an existing user name!"
      );
      return;
    }

    let topTenUsers = _.take(sortedUsers, 9);
    topTenUsers.push(searchedUser);

    updateTableData(topTenUsers, searchedUser);
  };

  const updateTableData = (
    users: UserData[],
    searchedUser: UserData | null = null
  ) => {
    const tableData: TableRow[] = users.map((user, index) => ({
      name: user.name,
      rank: user === searchedUser ? _.findIndex(userData, user) + 1 : index + 1,
      bananas: user.bananas,
      isSearchedUser: `${user === searchedUser}`,
    }));

    setTableData(tableData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Screen safeAreaEdges={["top"]}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Search user"
        />
        <Button onPress={onSearch} title="Search" />
      </View>
      <Table borderStyle={styles.tableContainer}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows
          data={tableData.map(Object.values)}
          style={styles.row}
          textStyle={styles.text}
        />
      </Table>
    </Screen>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 2,
    borderColor: "#c8e1ff",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "#fff" },
  rowSearchedUser: { flexDirection: "row", backgroundColor: "red" },
});
