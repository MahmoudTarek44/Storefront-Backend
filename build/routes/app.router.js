"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const users_router_1 = __importDefault(require("./users.router"));
const products_router_1 = __importDefault(require("./products.router"));
const orders_router_1 = __importDefault(require("./orders.router"));
const appRoutes = express_1.default.Router();
appRoutes.use("/user", users_router_1.default);
appRoutes.use("/product", products_router_1.default);
appRoutes.use("/order", orders_router_1.default);
exports.default = appRoutes;
