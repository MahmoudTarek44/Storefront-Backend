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
const connection_1 = __importDefault(require("../database/connection"));
class ProductsModel {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default.connect();
            try {
                const sql = "SELECT * FROM products";
                const { rows } = yield connection.query(sql);
                connection.release();
                return rows;
            }
            catch (err) {
                connection.release();
                throw new Error(`Error Occured: ${err}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_name, price } = product;
            const connection = yield connection_1.default.connect();
            try {
                const sql = "INSERT INTO products (product_name, price) VALUES($1, $2) RETURNING *";
                const { rows } = yield connection.query(sql, [product_name, price]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                connection.release();
                throw new Error(`Error occured:  ${err}`);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default.connect();
            try {
                const sql = "SELECT * FROM products WHERE id=($1)";
                const { rows } = yield connection.query(sql, [id]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                connection.release();
                throw new Error(`Error occured:  ${err}`);
            }
        });
    }
}
exports.default = ProductsModel;
