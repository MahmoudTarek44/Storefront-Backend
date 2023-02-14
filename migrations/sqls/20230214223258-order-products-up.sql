/* Replace with your SQL commands */
CREATE TABLE order_products (
    id              SERIAL PRIMARY KEY,
    product_id  INTEGER NOT NULL REFERENCES products (id),
    order_id  INTEGER NOT NULL REFERENCES orders (id),
    quantity   INTEGER NOT NULL

);