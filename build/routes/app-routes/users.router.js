"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var express_1 = __importDefault(require("express"));
// handlers
var users_login_1 = __importDefault(require("../../handlers/users/users.login"));
var users_add_1 = __importDefault(require("../../handlers/users/users.add"));
var users_get_1 = __importDefault(require("../../handlers/users/users.get"));
// middlewares
var authentication_middleware_1 = require("../../middlewares/authentication.middleware");
var userRouters = express_1.default.Router();
userRouters.use("/get", authentication_middleware_1.getAuthHeader, users_get_1.default);
userRouters.use("/create", users_add_1.default);
userRouters.use("/login", users_login_1.default);
exports.default = userRouters;
