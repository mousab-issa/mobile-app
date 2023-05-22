import { useEffect, useState } from "react";
import _ from "lodash";

export const useTableData = (
  userData: UserData[]
): [
  TableRow[],
  (users: UserData[], searchedUser?: UserData | null) => void
] => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  const updateTableData = (
    users: UserData[],
    searchedUser: UserData | null = null
  ) => {
    const tableData: TableRow[] = users.map((user, index) => {
      const isSearchedUser = user.uid === searchedUser?.uid;

      return {
        name: user.name,
        rank: user.rank,
        bananas: user.bananas,
        isSearchedUser: `${isSearchedUser}`,
      };
    });

    if (
      searchedUser &&
      !tableData.some((row) => row.name.includes(searchedUser.name))
    ) {
      if (tableData.length === 10) {
        tableData.pop();
      }

      tableData.push({
        name: searchedUser.name,
        rank: searchedUser.rank,
        bananas: searchedUser.bananas,
        isSearchedUser: "true",
      });
    }

    setTableData(tableData);
  };

  useEffect(() => {
    const topUsers = _.take(_.orderBy(userData, ["bananas"], ["desc"]), 10);
    updateTableData(topUsers);
  }, [userData]);

  return [tableData, updateTableData];
};
