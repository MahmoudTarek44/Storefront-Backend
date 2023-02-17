import express, { Request, Response, Router } from "express";

import UserModel from "../../models/userModel";

import { getUserToken } from "../../middlewares/authentication.middleware";
import { User } from "../../types/app.types";

const userModel: UserModel = new UserModel();
const createUser: Router = express.Router();

createUser.post("/", async (req: Request, res: Response) => {
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
			res.status(201).send({
				message: "User created successfully",
				userName: first_name,
				token: getUserToken(user),
			});
		})
		.catch((error: Error) => {
			res.status(400).send({ message: error });
		});
});

export default createUser;
