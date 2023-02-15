import jwt, { Secret } from "jsonwebtoken";
import { User } from "../types/app.types";
import supertest from "supertest";
import app from "../index";

const request = supertest(app);
const SECRET = process.env.SECRET as Secret;

describe("users module testing", () => {
	const userData: User = {
		first_name: "test",
		last_name: "test",
		user_password: "4444",
	};

	let token: string,
		userId = 1;

	it("Must have Authorization token to use users router", async () => {
		await request.get("/users").then((res) => {
			expect(res.status).toBe(401);
		});

		await request.get(`/users/${userId}`).then((res) => {
			expect(res.status).toBe(401);
		});

		await request
			.put(`/users/${userId}`)
			.send({
				first_name: userData.first_name + "test2",
				last_name: userData.last_name + "test2",
			})
			.then((res) => {
				expect(res.status).toBe(401);
			});

		await request.delete(`/users/${userId}`).then((res) => {
			expect(res.status).toBe(401);
		});
	});

	it("creating new user", async () => {
		await request
			.post("/users/create")
			.send(userData)
			.then((res) => {
				const { body, status } = res;
				token = body;

				// @ts-ignore
				const { user } = jwt.verify(token, SECRET);
				userId = user.id;

				expect(status).toBe(200);
			});
	});

	it("get all users data", async () => {
		await request
			.get("/users")
			.set("Authorization", "bearer " + token)
			.then((res) => {
				expect(res.status).toBe(200);
			});
	});

	it("get single user data", async () => {
		await request
			.get(`/users/${userId}`)
			.set("Authorization", "bearer " + token)
			.then((res) => {
				expect(res.status).toBe(200);
			});
	});

	it("user logging in his account", async () => {
		await request
			.post("/users/auth")
			.send({
				user_name: userData.first_name,
				password: userData.user_password,
			})
			.set("Authorization", "bearer " + token)
			.then((res) => {
				expect(res.status).toBe(200);
			});
	});
});
