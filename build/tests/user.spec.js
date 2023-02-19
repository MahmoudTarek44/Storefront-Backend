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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var request = (0, supertest_1.default)(index_1.default);
var SECRET = process.env.SECRET;
describe("users module testing", function () {
    var userData = {
        first_name: "test",
        last_name: "test",
        user_password: "4444",
    };
    var token, userId = 1;
    it("Must have Authorization token to use users router", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/users").then(function (res) {
                        expect(res.status).toBe(401);
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request.get("/users/".concat(userId)).then(function (res) {
                            expect(res.status).toBe(401);
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, request
                            .put("/users/".concat(userId))
                            .send({
                            first_name: userData.first_name + "test2",
                            last_name: userData.last_name + "test2",
                        })
                            .then(function (res) {
                            expect(res.status).toBe(401);
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, request.delete("/users/".concat(userId)).then(function (res) {
                            expect(res.status).toBe(401);
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("creating new user", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post("/users/create")
                        .send(userData)
                        .then(function (res) {
                        var body = res.body, status = res.status;
                        token = body;
                        // @ts-ignore
                        var user = jsonwebtoken_1.default.verify(token, SECRET).user;
                        userId = user.id;
                        expect(status).toBe(200);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("get all users data", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/users")
                        .set("Authorization", "bearer " + token)
                        .then(function (res) {
                        expect(res.status).toBe(200);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("get single user data", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/users/".concat(userId))
                        .set("Authorization", "bearer " + token)
                        .then(function (res) {
                        expect(res.status).toBe(200);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("user logging in his account", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post("/users/auth")
                        .send({
                        user_name: userData.first_name,
                        password: userData.user_password,
                    })
                        .set("Authorization", "bearer " + token)
                        .then(function (res) {
                        expect(res.status).toBe(200);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
