"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var dbConnect = new pg_1.Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.ENV === "dev"
        ? process.env.POSTGRES_DB
        : process.env.POSTGRES_DB_TEST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT
});
dbConnect.on("error", function (error) {
    throw new Error("Error has occured: ".concat(error));
});
exports["default"] = dbConnect;
