/* Replace with your SQL commands */
CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first_name       VARCHAR(250) NOT NULL,
    last_name        VARCHAR(250) NOT NULL,
    user_password VARCHAR(250) NOT NULL
);