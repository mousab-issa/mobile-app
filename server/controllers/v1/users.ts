import { Request, Response } from "express";
import expressPaginate from "express-paginate";
import fs from "fs";
import _ from "lodash";
import { config } from "../../config";
import { User } from "../../types/user";

const getDatabase = (): Record<string, User> => {
  const rawData = fs.readFileSync(config.dbPath);
  return JSON.parse(rawData.toString()).data;
};

export const getUsers = (req: Request, res: Response) => {
  const { query } = req.query;

  let database = getDatabase();

  let users = Object.entries(database).map(([key, value]) => ({
    ...value,
  }));

  if (query) {
    users = users.filter((user) =>
      user.name.toLowerCase().includes(String(query).toLowerCase())
    );
  }

  users = _.orderBy(users, ["bananas"], ["desc"]);

  const pageCount = Math.ceil(users.length / Number(req.query.limit));

  const skip = req.skip ? Number(req.skip) : 0;
  const limit = req.query.limit
    ? Number(req.query.limit)
    : config.pagination.default;

  users = users.slice(skip, skip + limit);

  const usersData: Record<string, User> = users.reduce(
    (acc, user) => ({ ...acc, [user.uid]: user }),
    {}
  );

  res.json({
    object: "list",
    has_more: expressPaginate.hasNextPages(req)(pageCount),
    data: usersData,
  });
};
