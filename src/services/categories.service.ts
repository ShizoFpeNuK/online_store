import platzApi from "@/utils/axios/axios.config";
import { ICategory } from "@/models/category.model";

class CategoriesService {
	private static pathBase = "/categories";

	static async getAll() {
		const categories = await platzApi.get<ICategory[]>(this.pathBase);

		return categories.data;
	}
}

export default CategoriesService;
