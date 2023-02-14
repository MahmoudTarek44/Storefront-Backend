export interface Product {
	id?: number;
	product_name: string;
	price: number;
}

export interface User {
	id?: number;
	first_name: string;
	last_name: string;
	user_password: string;
}

export interface Order {
	id?: number;
	user_id: number;
	status: boolean;
	products: productOrder[];
}

export interface productOrder {
	product_id: number;
	quantity: number;
}
