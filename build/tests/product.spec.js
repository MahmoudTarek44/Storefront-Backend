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
describe("products module testing", () => {
    const product = {
        product_name: "new product",
        price: 500,
    };
    let jwt_token;
    let user_id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            first_name: "test",
            last_name: "test",
            user_password: "4444",
        };
        const { body } = yield request.post("/users/create").send(userData);
        jwt_token = body;
        // @ts-ignore
        const { user } = jsonwebtoken_1.default.verify(token, SECRET);
        user_id = user.id;
    }));
    let product_id;
    it("create new product", (done) => {
        request
            .post("/products/create")
            .send(product)
            .set("Authorization", "bearer " + jwt_token)
            .then((res) => {
            const { body, status } = res;
            expect(status).toBe(200);
            product_id = body.id;
            done();
        });
    });
    it("get products data", (done) => {
        request.get("/products/getAll").then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("get single product data", (done) => {
        request.get(`/products/getOne/${product_id}`).then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
});
