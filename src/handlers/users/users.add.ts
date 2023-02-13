import { Request, Response } from "express";
import UserModel from "../../models/userModel";
import { getUserToken } from "../authentication/authentication.middleware";

export interface User {
	id?: number;
	first_name: string;
	last_name: string;
	user_password: string;
}

const userModel = new UserModel();

const create = async (req: Request, res: Response) => {
	try {
		const first_name = req.body.first_name as unknown as string;
		const last_name = req.body.last_name as unknown as string;
		const user_password = req.body.password as unknown as string;

		await userModel.create({
			first_name,
			last_name,
			user_password,
		})
			.then((user: User) => {
				res.status(201).send({ data: getUserToken(user) });
			})
			.catch((error: Error) => {
				res.status(400).send({ message: error });
			});
	} catch (error) {
		throw error;
	}
};

export default create;
