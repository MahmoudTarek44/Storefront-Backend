# Project: Storefront backend

## Quick overview

- It's the second test project in **FWD initiative** sponsered by the **Egyptian Government** for the _Advanced Wep development track_ at **UDACITY**.

-This project requires to create an **Storefront backend** to make the user able to resize there images.

- A perfect example of implementing of what we've learnt so far in the course **Backend-development using Node.js, Express.js ,postgres database, JWT and bcrypt for authentication and authorization & Tesing with Jasmine**.

## The Auther:

- I'm **Mahmoud Tarek Mahmoud Ali**.

## Table of Contents:

### How to use the API:
#### step 1:
- Add an **.env** file in the root directory to configure all the variable needed to run the app or connect to database

#### database port = 5432
#### server port = 4000

``` .env
POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = storefront
POSTGRES_PORT = 5432
POSTGRES_DB_TEST = storetest
POSTGRES_PORT_TEST = 5434

POSTGRES_USER = postgres
POSTGRES_PASSWORD = 140597

BCRYPT_PASSWORD = storefrontbcrypt
SECRET = storefrontsecret
SALT_ROUNDS = 10

APPLICATION_PORT = 4000
ENV = dev
```

#### step 2:
- Add a **database.json** file and add the following configuration

``` .json
{
    "dev": {
        "driver": "pg",
        "host": "127.0.0.1",
        "port": 5432,
        "database": "storefront",
        "user": "postgres",
        "password": "140597"
    },
    "test": {
        "driver": "pg",
        "host": "127.0.0.1",
        "port": 5434,
        "database": "storetest",
        "user": "postgres",
        "password": "140597"
    }
}
```
#### step 3:
- Add docker configuration file (docker-compose.yml) and add the following

``` .yml
version: '3.9'

services:
  postgres:
    image: postgres
    ports:
      - '5432:5432'
    env_file:
      - .env
    volumes:
      - 'postgres:/var/lib/postgresql/data'

volumes:
  postgres:

```
#### step 4:
- Installation process:
1. run docker > ```docker-compose up```
2. install dependencies > ```npm install ```
3. run database migrations > ```npm run databse-up```
4. build the application > ```npm run build ```
5. start the app and the server > ``` npm run dev ```

#### step 5:
- User for example these endpoints to communicate with server and the database.
**baseURL**: ```http://localhost:4000```
**some EndPoints**:
1. create new user : ```users/create```
1. create new product : ```products/create```
1. create new order : ```orders/create```
1. get all users : ```users/getAll```
1. get all products : ```products/getAll```
1. get single user : ```users/getOne```
1. get single product : ```products/getOne```

#### The Technologies used:

1. Node.js
2. Express.js
3. TypeScript
4. postgres
5. pg
6. JWT
7. Bcrypt
8. Jasmine
9. Prettier
10. ESlint
11. supertest


#### The code Editor:

- Visual Studio Code.

#### Sources:

1. Mainly => _UDACITY Class room_
   [Udacity](https://classroom.udacity.com/me)
   -Following the tips , notes and the instructions within the material of the course.

2. _Node.js & Express_
   [Node.js](https://nodejs.org/en/about/)
   [Express](https://expressjs.com/)

3. _Markdown Guide_
   [Markdownguide](https://www.markdownguide.org/cheat-sheet/)
   -Guide to write the proper code in markdown language

4. _JWT_ 
   [JsonWebToken](https://jwt.io/)
