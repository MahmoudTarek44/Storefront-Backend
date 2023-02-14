// Modules
import express from "express";

// handlers
import create from "../../handlers/orders/orders.create";

// middlewares
import { getAuthHeader } from "../../middlewares/authentication.middleware";

const orderRouters = express.Router();

orderRouters.use("/create", getAuthHeader, create);

export default orderRouters;
