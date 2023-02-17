import express, { Request, Response, Router } from "express";
import ProductsModel from "../../models/productModel";
import { Product } from "../../types/app.types";

const productModel = new ProductsModel();
const getProduct: Router = express.Router();

getProduct.get("/", async (req: Request, res: Response): Promise<void> => {
	await productModel
		.get()
		.then((products: Product[] | undefined) => {
			res.status(200).send({ data: products });
		})
		.catch((error: Error) => {
			res.status(404).send({ message: error });
		});
});

getProduct.get("/:id", async (req: Request, res: Response): Promise<void> => {
	await productModel
		.getById(+req.params.id)
		.then((product: Product | undefined) => {
			res.status(200).send({ data: product });
		})
		.catch((error: Error) => {
			res.status(404).send({ message: error });
		});
});

export default getProduct;
