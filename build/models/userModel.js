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
exports.__esModule = true;
var connection_1 = __importDefault(require("../database/connection"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var _a = process.env, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS;
var UsersModel = /** @class */ (function () {
    function UsersModel() {
    }
    UsersModel.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, rows, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = "SELECT * FROM users";
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows];
                    case 4:
                        err_1 = _a.sent();
                        connection.release();
                        throw new Error("Error occured: ".concat(err_1));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersModel.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var first_name, last_name, user_password, connection, sql, hash, rows, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        first_name = user.first_name, last_name = user.last_name, user_password = user.user_password;
                        return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = "INSERT INTO users (first_name, last_name, user_password) VALUES($1, $2, $3) RETURNING *";
                        hash = bcrypt_1["default"].hashSync(user_password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS, 10));
                        return [4 /*yield*/, connection.query(sql, [
                                first_name,
                                last_name,
                                hash,
                            ])];
                    case 3:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows[0]];
                    case 4:
                        err_2 = _a.sent();
                        connection.release();
                        throw new Error("error occured: ".concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersModel.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, rows, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = "SELECT * FROM users WHERE id=($1)";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 3:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows[0]];
                    case 4:
                        err_3 = _a.sent();
                        connection.release();
                        throw new Error("Error occured: ".concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersModel.prototype.login = function (user_name, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, rows, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = "SELECT * FROM users WHERE user_name=($1)";
                        return [4 /*yield*/, connection.query(sql, [user_name])];
                    case 3:
                        rows = (_a.sent()).rows;
                        if (rows.length > 0) {
                            user = rows[0];
                            if (bcrypt_1["default"].compareSync(password + BCRYPT_PASSWORD, user.user_password)) {
                                return [2 /*return*/, user];
                            }
                        }
                        connection.release();
                        return [2 /*return*/, null];
                    case 4:
                        err_4 = _a.sent();
                        connection.release();
                        throw new Error("Error occured: ".concat(err_4));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UsersModel;
}());
exports["default"] = UsersModel;
