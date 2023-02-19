// Modules
import express from "express";

// handlers
import getProduct from "../../handlers/products/products.get";
import create from "../../handlers/products/products.add";

// middlewares
import { getAuthHeader } from "../../middlewares/authentication.middleware";

const productRouters = express.Router();

productRouters.use("/create", getAuthHeader, create);
productRouters.use("/get", getAuthHeader, getProduct);

export default productRouters;
