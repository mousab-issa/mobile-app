import express from "express";
import { config } from "./config";
import usersRouter from "./api/v1/routes/users";

const app = express();
app.use(express.json());
app.use("/v1/users", usersRouter);

app.use("*", (req, res, err) => {
  console.log(err);
});

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
