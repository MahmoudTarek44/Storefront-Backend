"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const connection_1 = __importDefault(require("./database/connection"));
const express_1 = __importDefault(require("express"));
const app_router_1 = __importDefault(require("./routes/app.router"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.APPLICATION_PORT;
const app = (0, express_1.default)();
app.use("/", app_router_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port} ....`);
});
connection_1.default
    .connect()
    .then((db) => {
    console.log(db);
})
    .catch((error) => {
    throw new Error(`Database connection has error: ${error}`);
});
