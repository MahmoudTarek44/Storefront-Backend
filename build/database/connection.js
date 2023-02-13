"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const dbConnect = new pg_1.Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.ENV === "dev"
        ? process.env.POSTGRES_DB
        : process.env.POSTGRES_DB_TEST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
});
dbConnect.on("error", (error) => {
    throw new Error(`Error has occured: ${error}`);
});
exports.default = dbConnect;
