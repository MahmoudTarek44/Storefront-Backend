import express, { Request, Response } from "express";

import UserModel from "../../models/userModel";
import { User } from "../../types/app.types";

const userModel = new UserModel();
const getUser = express.Router();

getUser.get("/", async (req: Request, res: Response): Promise<void> => {
	await userModel
		.get()
		.then((users: User[]) => {
			res.status(200).send({ data: users });
		})
		.catch((error: Error) => {
			res.status(400).send(error);
		});
});

getUser.get("/:id", async (req: Request, res: Response): Promise<void> => {
	await userModel
		.getById(+req.params.id)
		.then((user: User) => {
			res.status(200).send({ data: user });
		})
		.catch((error: Error) => {
			res.status(400).send({ message: error });
		});
});

export default getUser;
