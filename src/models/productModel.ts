import dbConnect from "../database/connection";
import { Product } from "../types/app.types";

class ProductsModel {
  async get(): Promise<Product[]> {
    const connection = await dbConnect.connect();
    try {
      const sql = "SELECT * FROM products";
      const { rows } = await connection.query(sql);
      connection.release();
      return rows;
    } catch (err) {
      connection.release();
      throw new Error(`Error Occured: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    const { product_name, price } = product;

    const connection = await dbConnect.connect();
    try {
      const sql =
        "INSERT INTO products (product_name, price) VALUES($1, $2) RETURNING *";
      const { rows } = await connection.query(sql, [product_name, price]);
      connection.release();
      return rows[0];
    } catch (err) {
      connection.release();
      throw new Error(`Error occured:  ${err}`);
    }
  }

  async getById(id: number): Promise<Product> {
    const connection = await dbConnect.connect();
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (err) {
      connection.release();
      throw new Error(`Error occured:  ${err}`);
    }
  }
}

export default ProductsModel;
