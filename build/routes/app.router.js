"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const products_router_1 = __importDefault(require("./app-routes/products.router"));
const orders_router_1 = __importDefault(require("./app-routes/orders.router"));
const users_router_1 = __importDefault(require("./app-routes/users.router"));
const appRoutes = express_1.default.Router();
appRoutes.use("/products", products_router_1.default);
appRoutes.use("/orders", orders_router_1.default);
appRoutes.use("/users", users_router_1.default);
exports.default = appRoutes;
