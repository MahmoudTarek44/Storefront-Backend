"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthHeader = exports.getUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET;
const getUserToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ user }, SECRET);
    return token;
};
exports.getUserToken = getUserToken;
const getAuthHeader = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send("Authorization token is missing");
        return false;
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, SECRET);
        next();
    }
    catch (error) {
        res.status(401).send({
            message: `error occured within Authorization token`,
            error: error,
        });
        return false;
    }
};
exports.getAuthHeader = getAuthHeader;
