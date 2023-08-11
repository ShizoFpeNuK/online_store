import UserService from "@/services/users.service";
import { IUser } from "@/models/user.model";
import { shallow } from "zustand/shallow";
import { IProduct } from "@/models/product.model";
import { IProductCart } from "@/models/cart.model";
import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type UserStore = {
	user: IUser | null;
	cart: IProductCart[];
	showForm: boolean;
	addItemToCart: (item: IProduct) => void;
	registerUser: (user: IUser) => void;
	setShowForm: (boolean: boolean) => void;
};

const useUser = createWithEqualityFn<UserStore>()(
	devtools(
		persist(
			(set, get) => ({
				user: null,
				cart: [],
				showForm: false,
				addItemToCart: (item: IProduct) => {
					const foundItem = get().cart.find(({ id }) => id === item.id);

					if (foundItem) {
						set(
							(state) => ({
								cart: state.cart.map((item) => {
									return item.id === foundItem.id ? { ...item, quantity: item.quantity + 1 } : item;
								}),
							}),
							false,
							"addToCart",
						);
					} else {
						set(
							(state) => ({ cart: state.cart.concat({ ...item, quantity: 1 }) }),
							false,
							"addToCart",
						);
					}
				},
				registerUser: async (user: IUser) => {
					const newUser = await UserService.createUser(user);
					set({ user: newUser }, false, "register");
				},
				setShowForm: (boolean: boolean) => {
					set({ showForm: boolean }, false, "setShowForm");
				},
			}),
			{
				name: "user_store",
				storage: createJSONStorage(() => sessionStorage),
			},
		),
		{
			name: "user-store",
		},
	),
	shallow,
);

export default useUser;
