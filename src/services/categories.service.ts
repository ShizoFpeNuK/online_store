import axios from "axios";
import { ICategory } from "@/models/category.model";

class CategoriesService {
	private static pathBase = "https://api.escuelajs.co/api/v1/categories";

	static async getAll() {
		const categories = await axios.get<ICategory[]>(this.pathBase);

		return categories.data;
	}
}

export default CategoriesService;
