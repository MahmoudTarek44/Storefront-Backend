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
const userModel_1 = __importDefault(require("../models/userModel"));
const userModel = new userModel_1.default();
describe("User Model testing", () => {
    const user = {
        first_name: "test",
        last_name: "test",
        user_password: "4444",
    };
    // testing existing queries
    it("create new user query", () => {
        expect(userModel.create).toBeDefined();
    });
    it("get all users query", () => {
        expect(userModel.get).toBeDefined();
    });
    it("get single user query", () => {
        expect(userModel.getById).toBeDefined();
    });
    // testing queries behaviour
    function createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return userModel.create(user);
        });
    }
    it("successful create new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        if (createdUser) {
            const { first_name, last_name } = createdUser;
            expect(first_name).toBe(user.first_name);
            expect(last_name).toBe(user.last_name);
        }
    }));
    it("successful get all users list", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const usersList = yield userModel.get();
        expect(usersList).toEqual([createdUser]);
    }));
    it("successful get single user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const userFromDb = yield userModel.getById(+createdUser.id);
        expect(userFromDb).toEqual(createdUser);
    }));
    it("Successful user login", () => __awaiter(void 0, void 0, void 0, function* () {
        const loggedInUser = yield userModel.login(user.first_name, user.user_password);
        if (loggedInUser) {
            const { first_name, last_name } = loggedInUser;
            expect(first_name).toBe(user.first_name);
            expect(last_name).toBe(user.last_name);
        }
    }));
});
