import path from "path";
import fs from "fs";
import { UserDocument } from "../types/user";

export const getDatabase = (): UserDocument => {
  const filePath = path.resolve(__dirname, "./db.json");
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData.toString()).data;
};
