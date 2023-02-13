// Modules
import express from "express";

import userRouters from "./users.router";
import productRouters from "./products.router";
import orderRouters from "./orders.router";

const appRoutes = express.Router();

appRoutes.use("/user", userRouters);
appRoutes.use("/product", productRouters);
appRoutes.use("/order", orderRouters);

export default appRoutes;
