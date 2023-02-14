// Modules
import express from "express";

import userRouters from "./app-routes/users.router";
import productRouters from "./app-routes/products.router";
import orderRouters from "./app-routes/orders.router";

const appRoutes = express.Router();

appRoutes.use("/user", userRouters);
appRoutes.use("/product", productRouters);
appRoutes.use("/order", orderRouters);

export default appRoutes;
