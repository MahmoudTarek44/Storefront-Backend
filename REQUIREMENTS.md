# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index [GET]
- Show [GET]
- Create [POST] [token required]

#### Users
- Index [GET] [token required]
- Show [GET] [token required]
- Create [POST] [token required]

#### Orders
- create Order by user (args: user id) [POST] [token required]

## Data Shapes
#### User
- id : Int primary key
- firstName : string
- lastName : string
- user_password : string
#### Product
-  id : Int Primary key
- product_name : string
- price : Int

#### Orders
- id : Int Primary key
- user_id : Int Foreign key
- order_status of order (active or complete) : string

#### order_products

- id : Int Primary key
- order_id : Int Foreign key
- product_id : Int Foreign key
- quantity : Int