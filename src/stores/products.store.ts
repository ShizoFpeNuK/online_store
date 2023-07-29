import ProductsService from "@/services/products.service";
import { IProduct } from "@/models/product.model";
import { makeAutoObservable, runInAction } from "mobx";

class ProductsStore {
	products: IProduct[] = [];
	isLoading: boolean = true;

	constructor() {
		makeAutoObservable(this);
	}

	async getProducts() {
		try {
			const res = await ProductsService.getAll();
			runInAction(() => {
				this.products = res;
				this.isLoading = false;
			});
		} catch {
			this.isLoading = true;
		}
	}
}

export default ProductsStore;
