"use client";

import styles from "./ProductsList.module.scss";
import Product from "../Product/Product";
import { IProduct } from "@/models/product.model";
import { CSSProperties, FC } from "react";

interface IProductsList {
	title?: string;
	amount?: number;
	style?: CSSProperties;
	products: IProduct[];
}

const ProductsList: FC<IProductsList> = ({ title, amount, style, products }) => {
	let list: IProduct[] = [];

	if (amount) {
		list = products.filter((_, i) => i < amount);
	} else {
		list = products;
	}

	return (
		<section
			className={styles.products}
			style={style}
		>
			{title && <h2 className={styles.header}>{title}</h2>}
			<div className={styles.list}>
				{list.map((product) => (
					<Product
						key={product.id}
						product={product}
					/>
				))}
			</div>
		</section>
	);
};

export default ProductsList;
