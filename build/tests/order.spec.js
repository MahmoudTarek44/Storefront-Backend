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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
const SECRET = process.env.SECRET;
describe("Orders module testing", () => {
    let jwt_token, order, user_id, product_id, order_id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            first_name: "test",
            last_name: "test",
            user_password: "4444",
        };
        const productData = {
            product_name: "product sample name",
            price: 500,
        };
        const { body: userBody } = yield request
            .post("/users/create")
            .send(userData);
        jwt_token = userBody;
        // @ts-ignore
        const { user } = jsonwebtoken_1.default.verify(token, SECRET);
        user_id = user.id;
        const { body: productBody } = yield request
            .post("/products/create")
            .set("Authorization", "bearer " + jwt_token)
            .send(productData);
        product_id = productBody.id;
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
    it("creating new order", (done) => {
        request
            .post("/orders/create")
            .send(order)
            .set("Authorization", "bearer " + jwt_token)
            .then((res) => {
            const { body, status } = res;
            expect(status).toBe(200);
            order_id = body.id;
            done();
        });
    });
});
