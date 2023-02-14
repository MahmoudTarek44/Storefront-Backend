// Modules
import express from "express";

// handlers
import { get, getById } from "../../handlers/products/products.get";
import create from "../../handlers/products/products.add";

// middlewares
import { getAuthHeader } from "../../middlewares/authentication.middleware";

const productRouters = express.Router();

productRouters.use("/getAll", get);
productRouters.use("/getOne", getById);
productRouters.use("/create", getAuthHeader, create);

export default productRouters;
