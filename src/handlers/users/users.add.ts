import { Request, Response } from "express";
import UserModel from "../../models/userModel";

import { getUserToken } from "../../middlewares/authentication.middleware";
import { User } from "../../types/app.types";

const userModel = new UserModel();

const create = async (req: Request, res: Response) => {
	const first_name = req.body.first_name as unknown as string;
	const last_name = req.body.last_name as unknown as string;
	const user_password = req.body.password as unknown as string;

	await userModel
		.create({
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
};

export default create;
