"use client";

import styles from "./ProductsList.module.scss";
import Product from "../Product/Product";
import useProducts from "@/stores/useProducts";
import { IProduct } from "@/models/product.model";
import { CSSProperties, FC } from "react";

type IWrapperProducts = {
	products: IProduct[];
	style?: CSSProperties;
	title: string;
	amount: number;
};

const WrapperProducts: FC<IWrapperProducts> = ({ products, style, title, amount }) => {
	return (
		<section
			className={styles.products}
			style={style}
		>
			<h2 className={styles.header}>{title}</h2>
			<div className={styles.list}>
				{products
					.filter((_, i) => i < amount)
					.map((product) => (
						<Product
							key={product.id}
							product={product}
						/>
					))}
			</div>
		</section>
	);
};

// ------------------------------------ //

interface IProductsList {
	title: string;
	amount: number;
	style?: CSSProperties;
	filterPrice?: number;
	relatedInCategoryId?: number;
}

const ProductsList: FC<IProductsList> = ({
	title,
	amount,
	filterPrice,
	relatedInCategoryId,
	style,
}) => {
	const [products, filterByPrice, relatedInCategory] = useProducts((state) => [
		state.products,
		state.filterByPrice,
		state.relateInCategory,
	]);

	if (filterPrice) {
		return (
			<WrapperProducts
				products={filterByPrice(filterPrice)}
				style={style}
				title={title}
				amount={amount}
			/>
		);
	}

	if (relatedInCategoryId) {
		return (
			<WrapperProducts
				products={relatedInCategory(relatedInCategoryId)}
				style={style}
				title={title}
				amount={amount}
			/>
		);
	}

	return (
		<WrapperProducts
			products={products}
			style={style}
			title={title}
			amount={amount}
		/>
	);
};

export default ProductsList;
