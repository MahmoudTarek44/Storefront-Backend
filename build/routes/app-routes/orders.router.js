"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Modules
var express_1 = __importDefault(require("express"));
// handlers
var orders_create_1 = __importDefault(require("../../handlers/orders/orders.create"));
// middlewares
var authentication_middleware_1 = require("../../middlewares/authentication.middleware");
var orderRouters = express_1["default"].Router();
orderRouters.use("/create", authentication_middleware_1.getAuthHeader, orders_create_1["default"]);
exports["default"] = orderRouters;
