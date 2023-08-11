import { shallow } from "zustand/shallow";
import { ICategory } from "@/models/category.model";
import { createWithEqualityFn } from "zustand/traditional";

type CategoriesStore = {
	categories: ICategory[];
	setCategories: (categories: ICategory[]) => void;
};

const useCategories = createWithEqualityFn<CategoriesStore>(
	(set) => ({
		categories: [],
		setCategories: (categories) => {
			set({ categories });
		},
	}),
	shallow,
);

export default useCategories;
