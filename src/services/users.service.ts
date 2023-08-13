import platzApi from "@/utils/axios/axios.config";
import { ICreateUser, ILoginUser, IToken, IUpdateUser, IUser } from "@/models/user.model";

class UserService {
	private static pathBase = "/users";
	private static pathAuth = "/auth";

	static async register(user: ICreateUser): Promise<IUser> {
		const newUser = await platzApi.post<IUser>(`${this.pathBase}/`, user);

		return newUser.data;
	}

	static async login(user: ILoginUser): Promise<IUser> {
		const token = await platzApi.post<IToken>(`${this.pathAuth}/login`, user);
		const loginUser = await platzApi.get<IUser>(`${this.pathAuth}/profile`, {
			headers: {
				Authorization: `Bearer ${token.data.access_token}`,
			},
		});

		return loginUser.data;
	}

	static async update(id: number, user: IUpdateUser): Promise<IUser> {
		const newUser = await platzApi.put<IUser>(`${this.pathBase}/${id}`, user);

		return newUser.data;
	}
}

export default UserService;
