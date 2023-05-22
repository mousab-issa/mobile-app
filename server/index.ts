import express from "express";
import { config } from "./config";
import usersRouter from "./routes/v1/users";

const app = express();
app.use(express.json());
app.use("/v1/users", usersRouter);

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
