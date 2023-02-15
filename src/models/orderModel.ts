import dbConnect from "../database/connection";
import { Order } from "../types/app.types";

class OrdersModel {
  async create(order: Order): Promise<Order> {
    const { products, status, user_id } = order;
    const connection = await dbConnect.connect();

    try {
      const sql =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      const { rows } = await connection.query(sql, [user_id, status]);
      const order = rows[0];

      const productsArraySql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity";
      const orderProducts = [];

      for (const product of products) {
        const { product_id, quantity } = product;
        const { rows } = await connection.query(productsArraySql, [
          order.id,
          product_id,
          quantity,
        ]);
        orderProducts.push(rows[0]);
      }

      connection.release();

      return {
        ...order,
        products: orderProducts,
      };
    } catch (err) {
      connection.release();
      throw new Error(`Error occured:  ${user_id}. ${err}`);
    }
  }
}

export default OrdersModel;
