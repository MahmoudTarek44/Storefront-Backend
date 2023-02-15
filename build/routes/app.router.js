"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Modules
var express_1 = __importDefault(require("express"));
var users_router_1 = __importDefault(require("./app-routes/users.router"));
var products_router_1 = __importDefault(require("./app-routes/products.router"));
var orders_router_1 = __importDefault(require("./app-routes/orders.router"));
var appRoutes = express_1["default"].Router();
appRoutes.use("/user", users_router_1["default"]);
appRoutes.use("/product", products_router_1["default"]);
appRoutes.use("/order", orders_router_1["default"]);
exports["default"] = appRoutes;
