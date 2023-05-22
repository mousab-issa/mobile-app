import React from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Table, Row, Rows, SearchInput } from "../components";
import { Screen } from "../components/Screen";
import _ from "lodash";
import { useFetchUserData, useTableData } from "../hooks";
import { getInstance } from "../services/axios";

const axios = getInstance();

export const HomeScreen = () => {
  const { userData, searchedUser, fetchSearchedUser } = useFetchUserData();
  const [tableData, updateTableData] = useTableData(userData);

  const onSearch = (input: string) => {
    if (!input) return;

    fetchSearchedUser(input).then(() => {
      if (!searchedUser) {
        Alert.alert(
          "This user name does not exist! Please specify an existing user name!"
        );
        return;
      }

      const sortedUsers = _.orderBy(userData, ["bananas"], ["desc"]);
      const topTenUsers = _.take(sortedUsers, 10);
      updateTableData(topTenUsers, searchedUser);
    });
  };

  const tableHead = ["Name", "Rank", "Number of bananas", "isSearchedUser?"];

  return (
    <Screen safeAreaEdges={["top"]}>
      <SearchInput onSearch={onSearch} />
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
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "#fff" },
  rowSearchedUser: { flexDirection: "row", backgroundColor: "red" },
});
