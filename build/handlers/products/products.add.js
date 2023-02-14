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
const productModel_1 = __importDefault(require("../../models/productModel"));
const productModel = new productModel_1.default();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_name = req.body.product_name;
        const price = req.body.price;
        yield productModel
            .create({ product_name, price })
            .then((product) => {
            res.status(201).send({ data: product });
        })
            .catch((error) => {
            res.status(401).send({ message: error });
        });
    }
    catch (error) {
        throw error;
    }
});
exports.default = create;
