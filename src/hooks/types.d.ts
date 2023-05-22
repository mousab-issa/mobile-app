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
