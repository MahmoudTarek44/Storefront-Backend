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
describe("users module testing", () => {
    const userData = {
        first_name: "test",
        last_name: "test",
        user_password: "4444",
    };
    let token, userId = 1;
    it("Must have Authorization token to use users router", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/users").then((res) => {
            expect(res.status).toBe(401);
        });
        yield request.get(`/users/${userId}`).then((res) => {
            expect(res.status).toBe(401);
        });
        yield request
            .put(`/users/${userId}`)
            .send({
            first_name: userData.first_name + "test2",
            last_name: userData.last_name + "test2",
        })
            .then((res) => {
            expect(res.status).toBe(401);
        });
        yield request.delete(`/users/${userId}`).then((res) => {
            expect(res.status).toBe(401);
        });
    }));
    it("creating new user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post("/users/create")
            .send(userData)
            .then((res) => {
            const { body, status } = res;
            token = body;
            // @ts-ignore
            const { user } = jsonwebtoken_1.default.verify(token, SECRET);
            userId = user.id;
            expect(status).toBe(200);
        });
    }));
    it("get all users data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get("/users")
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it("get single user data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get(`/users/${userId}`)
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it("user logging in his account", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post("/users/auth")
            .send({
            user_name: userData.first_name,
            password: userData.user_password,
        })
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
});
