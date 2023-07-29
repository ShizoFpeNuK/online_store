"use client";

import Products from "@/components/Products/Products";
import ProductsStore from "@/stores/products.store";
import { observer } from "mobx-react";
import { FC, useEffect } from "react";

const productsStore = new ProductsStore();

interface IWrapperProducts {
	title: string;
	amount: number;
}

const WrapperProducts: FC<IWrapperProducts> = observer(({ title, amount }) => {
	useEffect(() => {
		productsStore.getProducts();
	}, []);
	return (
		<>
			{!productsStore.isLoading ? (
				<Products
					title={title}
					products={productsStore.products}
					amount={amount}
				/>
			) : (
				<div className="loading">Loading...</div>
			)}
		</>
	);
});

export default WrapperProducts;
