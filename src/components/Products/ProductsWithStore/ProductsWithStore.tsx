"use client";

import useProducts from "@/stores/useProducts";
import ProductsList from "../ProductsList/ProductsList";
import { CSSProperties, FC } from "react";

interface IProductsWithStore {
	filterPrice?: number;
	categoryId?: number;
	amount?: number;
	style?: CSSProperties;
	title?: string;
}

const ProductsWithStore: FC<IProductsWithStore> = ({
	filterPrice,
	categoryId,
	amount,
	title,
	style,
}) => {
	const [products, filterByPrice, relatedInCategory] = useProducts((state) => [
		state.products,
		state.filterByPrice,
		state.relateInCategory,
	]);

	if (filterPrice) {
		return (
			<ProductsList
				products={filterByPrice(filterPrice)}
				style={style}
				title={title}
				amount={amount}
			/>
		);
	}

	if (categoryId) {
		return (
			<ProductsList
				products={relatedInCategory(categoryId)}
				style={style}
				title={title}
				amount={amount}
			/>
		);
	}

	return (
		<ProductsList
			products={products}
			style={style}
			title={title}
			amount={amount}
		/>
	);
};

export default ProductsWithStore;
