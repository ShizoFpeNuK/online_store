export interface IProductCart {
	id: number;
	title: string;
	price: number;
	category: {
		name: string;
	};
	images: string[];
	quantity: number;
}
