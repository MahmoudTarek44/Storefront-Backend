"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
// handlers
const orders_create_1 = __importDefault(require("../../handlers/orders/orders.create"));
// middlewares
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const orderRouters = express_1.default.Router();
orderRouters.use("/create", authentication_middleware_1.getAuthHeader, orders_create_1.default);
exports.default = orderRouters;
