interface Product {
	id?: number;
	product_name: string;
	price: number;
}

interface User {
	id?: number;
	first_name: string;
	last_name: string;
	user_password: string;
}

interface Order {
	id?: number;
	user_id: number;
	status: string;
	products: orderProducts[];
}

interface orderProducts {
	id?: number;
	order_id: number;
	product_id: number;
	quantity: number;
}

export { Product, User, Order, orderProducts };
