import ProductsModel from "../models/productModel";
import { Product } from "../types/app.types";

const productModel = new ProductsModel();

describe("product Model testing", () => {
	const product: Product = {
		product_name: "new product",
		price: 500,
	};

	// testing existing queries
	it("create new product query", () => {
		expect(productModel.create).toBeDefined();
	});

	it("get all products query", () => {
		expect(productModel.get).toBeDefined();
	});

	it("get single product query", () => {
		expect(productModel.getById).toBeDefined();
	});

	// testing queries behaviour
	async function createProduct(product: Product) {
		return productModel.create(product);
	}

	it("successful create new product", async () => {
		const createdProduct: Product = await createProduct(product);
		expect(createdProduct).toEqual({
			id: createdProduct.id,
			...product,
		});
	});

	it("successful get all products list", async () => {
		const createdProduct: Product = await createProduct(product);
		const productList = await productModel.get();
		expect(productList).toEqual([createdProduct]);
	});

	it("successful get single product by id", async () => {
		const createdProduct: Product = await createProduct(product);
		const productFromDb = await productModel.getById(+createdProduct.id!);
		expect(productFromDb).toEqual(createdProduct);
	});
});
