"use client";

import Categories from "../Categories";
import CategoriesStore from "@/stores/categories.store";
import { observer } from "mobx-react";
import { FC, useEffect } from "react";

const categoriesStore = new CategoriesStore();

interface IWrapperCategories {
	title: string;
	amount: number;
}

const WrapperCategories: FC<IWrapperCategories> = observer(({ title, amount }) => {
	useEffect(() => {
		categoriesStore.getCategories();
	}, []);
	return (
		<>
			{!categoriesStore.isLoading ? (
				<Categories
					title={title}
					categories={categoriesStore.categories}
					amount={amount}
				/>
			) : (
				<div className="loading">Loading...</div>
			)}
		</>
	);
});

export default WrapperCategories;
