import { shallow } from "zustand/shallow";
import { IProduct } from "@/models/product.model";
import { IProductCart } from "@/models/cart.model";
import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type CartStore = {
	cart: IProductCart[];
	addItemToCart: (item: IProduct) => void;
};

const useCart = createWithEqualityFn<CartStore>()(
	devtools(
		persist(
			(set, get) => ({
				user: null,
				cart: [],
				showForm: false,
				addItemToCart: (item) => {
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
			}),
			{
				name: "cart_storage",
				storage: createJSONStorage(() => sessionStorage),
			},
		),
		{
			name: "cart_store",
		},
	),
	shallow,
);

export default useCart;
