import { Request, Response } from "express";

import ProductsModel from "../../models/productModel";
import { Product } from "../../types/app.types";

const productModel = new ProductsModel();

const create = async (req: Request, res: Response): Promise<void | boolean> => {
	const product_name = req.body.product_name as unknown as string;
	const price = req.body.price as unknown as number;

	await productModel
		.create({ product_name, price })
		.then((product: Product | undefined) => {
			res.status(201).send({ data: product });
		})
		.catch((error: Error) => {
			res.status(401).send({ message: error });
		});
};

export default create;
