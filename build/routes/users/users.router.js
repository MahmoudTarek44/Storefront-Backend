"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const userRouters = express_1.default.Router();
// userRouters.use("/get", );
// userRouters.use("/create", );
exports.default = userRouters;
