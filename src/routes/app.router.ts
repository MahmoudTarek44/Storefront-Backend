// Modules
import express from "express";

import userRouters from "./app-routes/users.router";
import productRouters from "./app-routes/products.router";
import orderRouters from "./app-routes/orders.router";

const appRoutes = express.Router();

appRoutes.use("/users", userRouters);
appRoutes.use("/products", productRouters);
appRoutes.use("/orders", orderRouters);

export default appRoutes;
