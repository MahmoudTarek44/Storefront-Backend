"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
// handlers
const users_login_1 = __importDefault(require("../../handlers/users/users.login"));
const users_add_1 = __importDefault(require("../../handlers/users/users.add"));
const users_get_1 = __importDefault(require("../../handlers/users/users.get"));
// middlewares
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const userRouters = express_1.default.Router();
userRouters.use("/get", authentication_middleware_1.getAuthHeader, users_get_1.default);
userRouters.use("/create", users_add_1.default);
userRouters.use("/login", users_login_1.default);
exports.default = userRouters;
