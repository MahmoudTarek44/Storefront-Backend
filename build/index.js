"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var connection_1 = __importDefault(require("./database/connection"));
var express_1 = __importDefault(require("express"));
var app_router_1 = __importDefault(require("./routes/app.router"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var port = process.env.ENV === "test" ? 4001 : process.env.APPLICATION_PORT;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", app_router_1.default);
app.listen(port, function () {
    console.log("Server is running on port ".concat(port, " ...."));
});
connection_1.default
    .connect()
    .then(function () {
    console.log("Database is connected successfully...");
})
    .catch(function (error) {
    throw new Error("Database connection has error: ".concat(error));
});
exports.default = app;
