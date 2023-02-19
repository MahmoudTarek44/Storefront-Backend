"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthHeader = exports.getUserToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET = process.env.SECRET;
var getUserToken = function (user) {
    var token = jsonwebtoken_1.default.sign({ user: user }, SECRET);
    return token;
};
exports.getUserToken = getUserToken;
var getAuthHeader = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send("Authorization token is missing");
        return false;
    }
    try {
        var token = req.headers.authorization;
        console.log(req.headers);
        jsonwebtoken_1.default.verify(token, SECRET);
        next();
    }
    catch (error) {
        res.status(401).send({
            message: "error occured checking Authorization token",
            error: error,
        });
        return false;
    }
};
exports.getAuthHeader = getAuthHeader;
