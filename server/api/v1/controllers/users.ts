import { Request, Response } from "express";
import expressPaginate from "express-paginate";
import _ from "lodash";
import { config } from "../../../config";
import { getDatabase } from "../../db";
import { UserDocument } from "../../types/user";

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

  const usersData: UserDocument = users.reduce(
    (acc, user) => ({ ...acc, [user.uid]: user }),
    {}
  );

  res.json({
    object: "list",
    has_more: expressPaginate.hasNextPages(req)(pageCount),
    data: usersData,
  });
};
