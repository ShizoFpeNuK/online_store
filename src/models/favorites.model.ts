export interface IProductFavorites {
	id: number;
	title: string;
	price: number;
	category: {
		name: string;
	};
	images: string[];
}
