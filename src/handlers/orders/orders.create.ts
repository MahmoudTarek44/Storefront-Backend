import express, { Request, Response, Router } from "express";
import { Order, orderProducts } from "../../types/app.types";
import OrdersModel from "../../models/orderModel";


const orderModel = new OrdersModel();
const createOrder: Router = express.Router();

createOrder.post("/", async (req: Request, res: Response) => {
	const products = req.body.products as unknown as orderProducts[];
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
});

export default createOrder;
