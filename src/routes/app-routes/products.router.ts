// Modules
import express from "express";

// handlers
import create from "../../handlers/products/products.add";
import getUser from "../../handlers/users/users.get";

// middlewares
import { getAuthHeader } from "../../middlewares/authentication.middleware";

const productRouters = express.Router();

productRouters.use("/create", getAuthHeader, create);
productRouters.use("/get", getAuthHeader, getUser);

export default productRouters;
