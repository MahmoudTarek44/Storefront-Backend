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
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = __importDefault(require("../database/connection"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserModel {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield connection_1.default.connect();
                const sql = "SELECT * FROM users";
                const { rows } = yield connection.query(sql);
                connection.release();
                return rows;
            }
            catch (err) {
                throw new Error(`Error occured: ${err}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name: first_name, last_name: last_name, user_password } = user;
            try {
                const sql = `INSERT INTO users (first_name, last_name, user_password) VALUES($1, $2, $3) RETURNING *`;
                const hash = bcrypt_1.default.hashSync(user_password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS, 10));
                const connection = yield connection_1.default.connect();
                const { rows } = yield connection.query(sql, [
                    first_name,
                    last_name,
                    hash,
                ]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`error occured: ${err}`);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE id=($1)";
                const connection = yield connection_1.default.connect();
                const { rows } = yield connection.query(sql, [id]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`Error occured: ${err}`);
            }
        });
    }
    login(user_name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE user_name=($1)";
                const connection = yield connection_1.default.connect();
                const { rows } = yield connection.query(sql, [user_name]);
                if (rows.length > 0) {
                    const user = rows[0];
                    if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.user_password)) {
                        return user;
                    }
                }
                connection.release();
                return null;
            }
            catch (err) {
                throw new Error(`Error occured: ${err}`);
            }
        });
    }
}
exports.default = UserModel;