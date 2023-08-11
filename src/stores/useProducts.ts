import { shallow } from "zustand/shallow";
import { IProduct } from "@/models/product.model";
import { createWithEqualityFn } from "zustand/traditional";

type ProductsStore = {
	products: IProduct[];
	setProducts: (products: IProduct[]) => void;
	filterByPrice: (filterPrice: number) => IProduct[];
	relateInCategory: (categoryId: number) => IProduct[];
};

const useProducts = createWithEqualityFn<ProductsStore>(
	(set, get) => ({
		products: [],
		setProducts: (products: IProduct[]) => {
			set({ products });
		},
		filterByPrice: (filterPrice: number) => {
			return get().products.filter(({ price }) => price < filterPrice);
		},
		relateInCategory: (categoryId: number) => {
			return get().products.filter(({ category: { id } }) => id === categoryId);
		},
	}),
	shallow,
);

export default useProducts;
