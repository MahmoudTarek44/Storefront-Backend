import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userModel";

import { getUserToken } from "../../middlewares/authentication.middleware";
import { User } from "../../types/app.types";

const userModel = new UserModel();
const loginUser: Router = express.Router();

loginUser.post("/", async (req: Request, res: Response) => {
	const first_name = req.body.first_name as unknown as string;
	const password = req.body.password as unknown as string;

	await userModel
		.login(first_name, password)
		.then((user: User | null) =>
			res
				.status(200)
				.send({ message: "Logged in successfully", token: getUserToken(user) })
		)
		.catch((error: Error) => {
			res.status(401).send({ message: error });
		});
});

export default loginUser;
