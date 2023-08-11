"use client";

import useProducts from "@/stores/useProducts";
import { IProduct } from "@/models/product.model";
import { FC, useRef } from "react";
import { ICategory } from "@/models/category.model";
import useCategories from "@/stores/useCategories";

interface IStoreInitializer {
	products: IProduct[];
	categories: ICategory[];
}

const StoreInitializer: FC<IStoreInitializer> = ({ products, categories }) => {
	const isInitialized = useRef(false);

	if (!isInitialized.current) {
		useProducts.setState({ products });
		useCategories.setState({ categories });
		isInitialized.current = true;
	}

	return null;
};

export default StoreInitializer;
