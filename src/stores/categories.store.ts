import CategoriesService from "@/services/categories.service";
import { ICategory } from "@/models/category.model";
import { makeAutoObservable, runInAction } from "mobx";

class CategoriesStore {
	categories: ICategory[] = [];
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	async getCategories() {
		try {
			this.isLoading = true;
			const res = await CategoriesService.getAll();
			runInAction(() => {
				this.categories = res;
				this.isLoading = false;
			});
		} catch {
			this.isLoading = true;
		}
	}
}

export default CategoriesStore;
