import UserService from "@/services/users.service";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { ICreateUser, ILoginUser, IUpdateUser, IUser } from "@/models/user.model";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type UserStore = {
	user: IUser | null;
	showForm: boolean;
	formType: string;
	setShowForm: (boolean: boolean) => void;
	setFormType: (formType: string) => void;
	registerUser: (user: ICreateUser) => void;
	loginUser: (user: ILoginUser) => void;
	updateUser: (user: IUpdateUser) => void;
	logout: () => void;
};

export const formTypes = { register: "register", login: "login" };

const useUser = createWithEqualityFn<UserStore>()(
	devtools(
		persist(
			(set, get) => ({
				user: null,
				showForm: false,
				formType: formTypes.register,
				setShowForm: (boolean) => {
					set({ showForm: boolean }, false, "setShowForm");
				},
				setFormType: (formType) => {
					set({ formType }, false, "setFormType");
				},
				registerUser: async (user) => {
					const newUser = await UserService.register(user);
					set({ user: newUser }, false, "register");
				},
				loginUser: async (user) => {
					const loginUser = await UserService.login(user);
					set({ user: loginUser }, false, "login");
				},
				updateUser: async (updateUser) => {
					if (!get().user) {
						return;
					}

					let key: keyof IUpdateUser;
					const copyUser = { ...updateUser };

					for (key in copyUser) {
						if (!copyUser[key]) {
							copyUser[key] = get().user![key];
						}
					}

					const newUser = await UserService.update(get().user!.id, copyUser);
					set({ user: newUser }, false, "updateUser");
				},
				logout: () => {
					set({ user: null }, false, "logout");
				},
			}),
			{
				name: "user_storage",
				storage: createJSONStorage(() => localStorage),
				partialize: (state) => ({ user: state.user }),
			},
		),
		{
			name: "user_store",
		},
	),
	shallow,
);

export default useUser;
