"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
// handlers
const products_get_1 = __importDefault(require("../../handlers/products/products.get"));
const products_add_1 = __importDefault(require("../../handlers/products/products.add"));
// middlewares
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const productRouters = express_1.default.Router();
productRouters.use("/create", authentication_middleware_1.getAuthHeader, products_add_1.default);
productRouters.use("/get", authentication_middleware_1.getAuthHeader, products_get_1.default);
exports.default = productRouters;
