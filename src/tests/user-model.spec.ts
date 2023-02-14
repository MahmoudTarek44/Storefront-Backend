import UsersModel from "../models/userModel";
import { User } from "../types/app.types";

const userModel = new UsersModel();

describe("User Model testing", () => {
	const user: User = {
		first_name: "test",
		last_name: "test",
		user_password: "4444",
	};

	// testing existing queries
	it("create new user query", () => {
		expect(userModel.create).toBeDefined();
	});

	it("get all users query", () => {
		expect(userModel.get).toBeDefined();
	});

	it("get single user query", () => {
		expect(userModel.getById).toBeDefined();
	});

	// testing queries behaviour
	async function createUser(user: User) {
		return userModel.create(user);
	}

	it("successful create new user", async () => {
		const createdUser: User = await createUser(user);
		if (createdUser) {
			const { first_name, last_name } = createdUser;
			expect(first_name).toBe(user.first_name);
			expect(last_name).toBe(user.last_name);
		}
	});

	it("successful get all users list", async () => {
		const createdUser: User = await createUser(user);
		const usersList = await userModel.get();
		expect(usersList).toEqual([createdUser]);
	});

	it("successful get single user by id", async () => {
		const createdUser: User = await createUser(user);
		const userFromDb = await userModel.getById(+createdUser.id!);
		expect(userFromDb).toEqual(createdUser);
	});

	it("Successful user login", async () => {
		const loggedInUser = await userModel.login(
			user.first_name,
			user.user_password
		);
		if (loggedInUser) {
			const { first_name, last_name } = loggedInUser;
			expect(first_name).toBe(user.first_name);
			expect(last_name).toBe(user.last_name);
		}
	});
});
