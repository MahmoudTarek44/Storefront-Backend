// Modules
import express from "express";

// handlers
import createOrder from "../../handlers/orders/orders.create";

// middlewares
import { getAuthHeader } from "../../middlewares/authentication.middleware";

const orderRouters = express.Router();

orderRouters.use("/create", getAuthHeader, createOrder);

export default orderRouters;
