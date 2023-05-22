interface ApiResponse<T> {
  data: T;
}

interface UserData {
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  name: string;
  stars: number;
  subscribed: boolean;
  uid: string;
  rank: number;
}

interface UserState {
  users: UserData[];
  searchedUser: UserData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

type UserDataPayload = ApiResponse<UserData[]>;
