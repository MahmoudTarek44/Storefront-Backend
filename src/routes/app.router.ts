// Modules
import express from "express";

import productRouters from "./app-routes/products.router";
import orderRouters from "./app-routes/orders.router";
import userRouters from "./app-routes/users.router";

const appRoutes = express.Router();

appRoutes.use("/products", productRouters);
appRoutes.use("/orders", orderRouters);
appRoutes.use("/users", userRouters);

export default appRoutes;
