/* Replace with your SQL commands */
CREATE TABLE orders (
    id      SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id),
    order_status  VARCHAR(10) NOT NULL
);