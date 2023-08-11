import UserService from "@/services/users.service";
import { shallow } from "zustand/shallow";
import { ICreateUser, IUser } from "@/models/user.model";
import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type UserStore = {
	user: IUser | null;
	showForm: boolean;
	registerUser: (user: ICreateUser) => void;
	setShowForm: (boolean: boolean) => void;
};

const useUser = createWithEqualityFn<UserStore>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				showForm: false,
				registerUser: async (user) => {
					const newUser = await UserService.createUser(user);
					set({ user: newUser }, false, "register");
				},
				setShowForm: (boolean) => {
					set({ showForm: boolean }, false, "setShowForm");
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
