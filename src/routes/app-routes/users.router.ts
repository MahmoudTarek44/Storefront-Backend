// Modules
import express from "express";

// handlers
import { get, getById } from "../../handlers/users/users.get";
import create from "../../handlers/users/users.add";

// middlewares
import { getAuthHeader } from "../../middlewares/authentication.middleware";

const userRouters = express.Router();

userRouters.use("/getAll", getAuthHeader, get);
userRouters.use("/getOne", getAuthHeader, getById);
userRouters.use("/create", create);

export default userRouters;
