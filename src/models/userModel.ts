import bcrypt from "bcrypt";
import dbConnect from "../database/connection";
import { User } from "../handlers/users/users.add";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

class UserModel {
	async get(): Promise<User[]> {
		try {
			const connection = await dbConnect.connect();
			const sql = "SELECT * FROM users";
			const { rows } = await connection.query(sql);
			connection.release();
			return rows;
		} catch (err) {
			throw new Error(`Error occured: ${err}`);
		}
	}

	async create(user: User): Promise<User> {
		const { first_name: first_name, last_name: last_name, user_password } = user;

		try {
			const sql = `INSERT INTO users (first_name, last_name, user_password) VALUES($1, $2, $3) RETURNING *`;
			const hash = bcrypt.hashSync(
				user_password + BCRYPT_PASSWORD,
				parseInt(SALT_ROUNDS as string, 10)
			);
			const connection = await dbConnect.connect();
			const { rows } = await connection.query(sql, [
				first_name,
				last_name,
				hash,
			]);

			connection.release();
			return rows[0];
		} catch (err) {
			throw new Error(`error occured: ${err}`);
		}
	}

	async getById(id: number): Promise<User> {
		try {
			const sql = "SELECT * FROM users WHERE id=($1)";
			const connection = await dbConnect.connect();
			const { rows } = await connection.query(sql, [id]);

			connection.release();

			return rows[0];
		} catch (err) {
			throw new Error(`Error occured: ${err}`);
		}
	}

	async login(user_name: string, password: string): Promise<User | null> {
		try {
			const sql = "SELECT * FROM users WHERE user_name=($1)";
			const connection = await dbConnect.connect();
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
			throw new Error(`Error occured: ${err}`);
		}
	}
}

export default UserModel;
