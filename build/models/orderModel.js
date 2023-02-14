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
class OrdersModel {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products, status, user_id } = order;
            const connection = yield connection_1.default.connect();
            try {
                const sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
                const { rows } = yield connection.query(sql, [user_id, status]);
                const order = rows[0];
                const productsArraySql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity";
                const orderProducts = [];
                for (const product of products) {
                    const { product_id, quantity } = product;
                    const { rows } = yield connection.query(productsArraySql, [
                        order.id,
                        product_id,
                        quantity,
                    ]);
                    orderProducts.push(rows[0]);
                }
                connection.release();
                return Object.assign(Object.assign({}, order), { products: orderProducts });
            }
            catch (err) {
                connection.release();
                throw new Error(`Error occured:  ${user_id}. ${err}`);
            }
        });
    }
}
exports.default = OrdersModel;
