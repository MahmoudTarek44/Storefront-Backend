/* Replace with your SQL commands */
CREATE TABLE orders (
    id      SERIAL PRIMARY KEY,
    product_id  INTEGER NOT NULL REFERENCES products (id),
    user_id INTEGER NOT NULL REFERENCES users (id),
    quantity   INTEGER NOT NULL,
    order_status  VARCHAR(10) NOT NULL
);