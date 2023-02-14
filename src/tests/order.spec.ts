import { Order, Product, User } from "../types/app.types";
import jwt, { Secret } from "jsonwebtoken";
import supertest from "supertest";
import app from "../index";

const request = supertest(app);
const SECRET = process.env.SECRET as Secret;

describe("Orders module testing", () => {
	let jwt_token: string,
		order: Order,
		user_id: number,
		product_id: number,
		order_id: number;

	beforeAll(async () => {
		const userData: User = {
			first_name: "test",
			last_name: "test",
			user_password: "4444",
		};
		const productData: Product = {
			product_name: "product sample name",
			price: 500,
		};

		const { body: userBody } = await request
			.post("/users/create")
			.send(userData);

		jwt_token = userBody;

		// @ts-ignore

		const { user } = jwt.verify(token, SECRET);
		user_id = user.id;

		const { body: productBody } = await request
			.post("/products/create")
			.set("Authorization", "bearer " + jwt_token)
			.send(productData);
		product_id = productBody.id;
		order = {
			products: [
				{
					product_id,
					quantity: 100,
				},
			],
			user_id,
			status: 'completed',
		};
	});

	it("creating new order", (done) => {
		request
			.post("/orders/create")
			.send(order)
			.set("Authorization", "bearer " + jwt_token)
			.then((res: any) => {
				const { body, status } = res;
				expect(status).toBe(200);
				order_id = body.id;
				done();
			});
	});
});
