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
const productModel_1 = __importDefault(require("../models/productModel"));
const productModel = new productModel_1.default();
describe("product Model testing", () => {
    const product = {
        product_name: "new product",
        price: 500,
    };
    // testing existing queries
    it("create new product query", () => {
        expect(productModel.create).toBeDefined();
    });
    it("get all products query", () => {
        expect(productModel.get).toBeDefined();
    });
    it("get single product query", () => {
        expect(productModel.getById).toBeDefined();
    });
    // testing queries behaviour
    function createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return productModel.create(product);
        });
    }
    it("successful create new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        expect(createdProduct).toEqual(Object.assign({ id: createdProduct.id }, product));
    }));
    it("successful get all products list", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const productList = yield productModel.get();
        expect(productList).toEqual([createdProduct]);
    }));
    it("successful get single product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const productFromDb = yield productModel.getById(+createdProduct.id);
        expect(productFromDb).toEqual(createdProduct);
    }));
});
