import platzApi from "@/utils/axios/axios.config";
import { IProduct } from "@/models/product.model";

class ProductsService {
	private static pathBase = "/products";

	static async getAll() {
		const products = await platzApi.get<IProduct[]>(this.pathBase);

		return products.data;
	}
}

export default ProductsService;
