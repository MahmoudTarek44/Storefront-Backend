// Modules
import express from "express";

// handlers
import loginUser from "../../handlers/users/users.login";
import createUser from "../../handlers/users/users.add";
import getUser from "../../handlers/users/users.get";

// middlewares
import { getAuthHeader } from "../../middlewares/authentication.middleware";

const userRouters = express.Router();

userRouters.use("/get", getAuthHeader, getUser);
userRouters.use("/create", createUser);
userRouters.use("/login", loginUser);

export default userRouters;
