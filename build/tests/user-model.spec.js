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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userModel_1 = __importDefault(require("../models/userModel"));
var userModel = new userModel_1.default();
describe("User Model testing", function () {
    var user = {
        first_name: "test",
        last_name: "test",
        user_password: "4444",
    };
    // testing existing queries
    it("create new user query", function () {
        expect(userModel.create).toBeDefined();
    });
    it("get all users query", function () {
        expect(userModel.get).toBeDefined();
    });
    it("get single user query", function () {
        expect(userModel.getById).toBeDefined();
    });
    // testing queries behaviour
    function createUser(user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, userModel.create(user)];
            });
        });
    }
    it("successful create new user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, first_name, last_name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createUser(user)];
                case 1:
                    createdUser = _a.sent();
                    if (createdUser) {
                        first_name = createdUser.first_name, last_name = createdUser.last_name;
                        expect(first_name).toBe(user.first_name);
                        expect(last_name).toBe(user.last_name);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it("successful get all users list", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, usersList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createUser(user)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, userModel.get()];
                case 2:
                    usersList = _a.sent();
                    expect(usersList).toEqual([createdUser]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("successful get single user by id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, userFromDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createUser(user)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, userModel.getById(+createdUser.id)];
                case 2:
                    userFromDb = _a.sent();
                    expect(userFromDb).toEqual(createdUser);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Successful user login", function () { return __awaiter(void 0, void 0, void 0, function () {
        var loggedInUser, first_name, last_name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.login(user.first_name, user.user_password)];
                case 1:
                    loggedInUser = _a.sent();
                    if (loggedInUser) {
                        first_name = loggedInUser.first_name, last_name = loggedInUser.last_name;
                        expect(first_name).toBe(user.first_name);
                        expect(last_name).toBe(user.last_name);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
