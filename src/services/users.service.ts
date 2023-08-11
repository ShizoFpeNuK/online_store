import platzApi from "@/utils/axios/axios.config";
import { ICreateUser, IUser } from "@/models/user.model";

class UserService {
	private static pathBase = "/users";

	static async createUser(user: ICreateUser): Promise<IUser> {
		const newUser = await platzApi.post<IUser>(`${this.pathBase}/`, user);

		return newUser.data;
	}
}

export default UserService;
