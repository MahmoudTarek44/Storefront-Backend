// Modules
import express from "express";
import { get, getById } from "../handlers/users/users.get";
import create from "../handlers/users/users.add";

const userRouters = express.Router();

userRouters.use("/getAll", get);
userRouters.use("/getOne", getById);
userRouters.use("/create", create);

export default userRouters;