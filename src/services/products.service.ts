import platzApi from "@/utils/axios/axios.config";
import { IProduct } from "@/models/product.model";

class ProductsService {
	private static pathBase = "/products";

	static async getAll(): Promise<IProduct[]> {
		const products = await platzApi.get<IProduct[]>(this.pathBase);
    
		return products.data;
	}

	static async getOne(id: number | string): Promise<IProduct> {
		const product = await platzApi.get<IProduct>(`${this.pathBase}/${id}`);

		return product.data;
	}
}

export default ProductsService;
