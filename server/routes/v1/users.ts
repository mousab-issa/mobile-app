import express from "express";
import { getUsers } from "../../controllers/v1/users";

const router = express.Router();

router.get("/", getUsers);

export default router;
