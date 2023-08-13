import platzApi from "@/utils/axios/axios.config";
import { IProduct } from "@/models/product.model";
import { ParamsProducts } from "@/types/paramsProducts";

class ProductsService {
	private static pathBase = "/products";

	static async getAll(params?: ParamsProducts): Promise<IProduct[]> {
		const products = await platzApi.get<IProduct[]>(this.pathBase, {
			params,
		});

		return products.data;
	}

	static async getOne(id: number | string): Promise<IProduct> {
		const product = await platzApi.get<IProduct>(`${this.pathBase}/${id}`);

		return product.data;
	}
}

export default ProductsService;
