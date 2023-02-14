import { Request, Response } from "express";
import { Order, productOrder } from "../../types/app.types";

import OrdersModel from "../../models/orderModel";

const orderModel = new OrdersModel();

const create = async (req: Request, res: Response) => {
	try {
		let products = req.body.products as unknown as productOrder[];
		const status = req.body.status as unknown as string;
		const user_id = req.body.user_id as unknown as number;

		await orderModel
			.create({ products, status, user_id })
			.then((order: Order | undefined) => {
				res.status(201).send({ data: order });
			})
			.catch((error: Error) => {
				res.status(401).send({ message: error });
			});
	} catch (error) {
		throw error;
	}
};

export default create;
