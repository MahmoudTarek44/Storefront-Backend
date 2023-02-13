import { Request, Response } from "express";
import { User } from "./users.add";

import UserModel from "../../models/userModel";

const userModel = new UserModel();

const get = async (req: Request, res: Response) => {
	try {
		await userModel
			.get()
			.then((users: User[]) => {
				res.status(200).send(users);
			})
			.catch((error: Error) => {
				res.status(400).send(error);
			});
	} catch (error) {
		throw error;
	}
};

const getById = async (req: Request, res: Response) => {
	try {
		await userModel
			.getById(+req.params.id)
			.then((user: User) => {
				res.status(200).send({ data: user });
			})
			.catch((error: Error) => {
				res.status(400).send({ message: error });
			});
	} catch (error) {
		throw error;
	}
};

export { get, getById };
