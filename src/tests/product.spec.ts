import jwt, { Secret } from "jsonwebtoken";
import supertest from "supertest";
import app from "../index";

import { Product } from "../types/app.types";
import { User } from "../types/app.types";

const request = supertest(app);
const SECRET = process.env.SECRET as Secret;

describe("products module testing", () => {
  const product: Product = {
    product_name: "new product",
    price: 500,
  };

  let jwt_token: string;
  let user_id: number;
  beforeAll(async () => {
    const userData: User = {
      first_name: "test",
      last_name: "test",
      user_password: "4444",
    };
    const { body } = await request.post("/users/create").send(userData);
    jwt_token = body;

    // @ts-ignore
    const { user } = jwt.verify(token, SECRET);
    user_id = user.id;
  });

  let product_id: number;
  it("create new product", (done) => {
    request
      .post("/products/create")
      .send(product)
      .set("Authorization", "bearer " + jwt_token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        product_id = body.id;
        done();
      });
  });

  it("get products data", (done) => {
    request.get("/products/getAll").then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it("get single product data", (done) => {
    request.get(`/products/getOne/${product_id}`).then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
});
