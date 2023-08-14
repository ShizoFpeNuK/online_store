import platzApi from "@/utils/axios/axios.config";
import { ICategory } from "@/models/category.model";

class CategoriesService {
	private static pathBase = "/categories";

	static async getAll(): Promise<ICategory[]> {
		const categories = await platzApi.get<ICategory[]>(this.pathBase);

		return categories.data;
	}

	static async getOne(id: number | string): Promise<ICategory> {
		const categories = await platzApi.get<ICategory>(`${this.pathBase}/${id}`);

		return categories.data;
	}
}

export default CategoriesService;
