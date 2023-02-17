"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const userModel = new userModel_1.default();
const loginUser = express_1.default.Router();
loginUser.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const first_name = req.body.first_name;
    const password = req.body.password;
    yield userModel
        .login(first_name, password)
        .then((user) => res
        .status(200)
        .send({ message: "Logged in successfully", token: (0, authentication_middleware_1.getUserToken)(user) }))
        .catch((error) => {
        res.status(401).send({ message: error });
    });
}));
exports.default = loginUser;
