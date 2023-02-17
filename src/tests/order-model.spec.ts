import { Order, Product, User } from "../types/app.types";
import ProductsModel from "../models/productModel";
import OrdersModel from "../models/orderModel";
import UsersModel from "../models/userModel";

const productModel = new ProductsModel();
const orderModel = new OrdersModel();
const userModel = new UsersModel();

describe("Order Model testing", () => {
  let order: Order, user_id: number, product_id: number, order_id:number

  beforeAll(async () => {
    const user: User = await userModel.create({
      first_name: "test",
      last_name: "test",
      user_password: "4444",
    });

    user_id = user.id!;

    const product: Product = await productModel.create({
      product_name: "order prod",
      price: 100,
    });

    product_id = product.id!;
    order = {
      products: [
        {
          product_id,
          order_id,
          quantity: 100,
        },
      ],
      user_id,
      status: "completed",
    };
  });

  // testing existing queries
  async function createOrder(order: Order) {
    return orderModel.create(order);
  }

  it("create new order query", () => {
    expect(orderModel.create).toBeDefined();
  });

  // testing queries behaviour
  it("successful create new order", async () => {
    const createdOrder: Order = await createOrder(order);

    expect(createdOrder).toEqual({
      id: createdOrder.id,
      ...order,
    });
  });
});
