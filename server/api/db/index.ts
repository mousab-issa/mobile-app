import path from "path";
import fs from "fs";
import { User } from "../v1/types/user";

export const getDatabase = (): Record<string, User> => {
  const filePath = path.resolve(__dirname, "./db.json");
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData.toString()).data;
};
