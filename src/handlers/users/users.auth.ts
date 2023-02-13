import { Request, Response } from "express";
import UserModel from "../../models/userModel";
import { getUserToken } from "../authentication/authentication.middleware";
import { User } from "./users.add";

const userModel = new UserModel();

const login = async (req: Request, res: Response) => {
	try {
		const user_name = req.body.user_name as unknown as string;
		const password = req.body.password as unknown as string;

		await userModel
			.login(user_name, password)
			.then((user: User| null) => res.status(200).send({ data: getUserToken(user) }))
			.catch((error: Error) => {
				res.status(401).send({ message: error });
			});
	} catch (error) {
		throw error;
	}
};

export default login;
