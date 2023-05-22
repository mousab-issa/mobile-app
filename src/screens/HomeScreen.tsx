import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Table, Row, Rows, SearchInput } from "../components";
import { Screen } from "../components/Screen";
import _ from "lodash";
import { useTableData } from "../hooks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchSearchedUser, fetchUsers } from "../store/users/actions";

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { users, searchedUser, status } = useAppSelector(
    (state) => state.users
  );

  const [tableData, updateTableData] = useTableData(users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const sortedUsers = _.orderBy(users, ["bananas"], ["desc"]);
    const topTenUsers = _.take(sortedUsers, 10);
    updateTableData(topTenUsers, searchedUser);
  }, [searchedUser]);

  const onSearch = async (input: string) => {
    if (!input) return;

    dispatch(fetchSearchedUser({ input }));
  };

  const tableHead = ["Name", "Rank", "Number of bananas", "isSearchedUser?"];

  return (
    <Screen safeAreaEdges={["top"]} preset="scroll">
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
