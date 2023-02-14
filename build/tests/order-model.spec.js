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
const orderModel_1 = __importDefault(require("../models/orderModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const productModel = new productModel_1.default();
const orderModel = new orderModel_1.default();
const userModel = new userModel_1.default();
describe("Order Model testing", () => {
    let order, user_id, product_id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel.create({
            first_name: "test",
            last_name: "test",
            user_password: "4444",
        });
        user_id = user.id;
        const product = yield productModel.create({
            product_name: "order prod",
            price: 100,
        });
        product_id = product.id;
        order = {
            products: [
                {
                    product_id,
                    quantity: 100,
                },
            ],
            user_id,
            status: "completed",
        };
    }));
    // testing existing queries
    function createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return orderModel.create(order);
        });
    }
    it("create new order query", () => {
        expect(orderModel.create).toBeDefined();
    });
    // testing queries behaviour
    it("successful create new order", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        expect(createdOrder).toEqual(Object.assign({ id: createdOrder.id }, order));
    }));
});
