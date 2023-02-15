import dbConnect from "../database/connection";
import bcrypt from "bcrypt";
import { User } from "../types/app.types";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

class UsersModel {
  async get(): Promise<User[]> {
    const connection = await dbConnect.connect();
    try {
      const sql = "SELECT * FROM users";
      const { rows } = await connection.query(sql);
      connection.release();
      return rows;
    } catch (err) {
      connection.release();
      throw new Error(`Error occured: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    const {
      first_name: first_name,
      last_name: last_name,
      user_password,
    } = user;

    const connection = await dbConnect.connect();
    try {
      const sql = `INSERT INTO users (first_name, last_name, user_password) VALUES($1, $2, $3) RETURNING *`;
      const hash = bcrypt.hashSync(
        user_password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string, 10)
      );
      const { rows } = await connection.query(sql, [
        first_name,
        last_name,
        hash,
      ]);

      connection.release();
      return rows[0];
    } catch (err) {
      connection.release();
      throw new Error(`error occured: ${err}`);
    }
  }

  async getById(id: number): Promise<User> {
    const connection = await dbConnect.connect();
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (err) {
      connection.release();
      throw new Error(`Error occured: ${err}`);
    }
  }

  async login(user_name: string, password: string): Promise<User | null> {
    const connection = await dbConnect.connect();
    try {
      const sql = "SELECT * FROM users WHERE user_name=($1)";
      const { rows } = await connection.query(sql, [user_name]);
      if (rows.length > 0) {
        const user = rows[0];
        if (
          bcrypt.compareSync(password + BCRYPT_PASSWORD, user.user_password)
        ) {
          return user;
        }
      }
      connection.release();
      return null;
    } catch (err) {
      connection.release();
      throw new Error(`Error occured: ${err}`);
    }
  }
}

export default UsersModel;
