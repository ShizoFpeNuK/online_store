import { shallow } from "zustand/shallow";
import { IProduct } from "@/models/product.model";
import { IProductCart } from "@/models/cart.model";
import { NAME_STORAGES } from "@/utils/storages/nameStorages";
import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IProductFavorites } from "@/models/favorites.model";

type CartStore = {
	cart: IProductCart[];
	addItem: (item: IProduct | IProductFavorites) => void;
	removeItem: (item: IProductCart) => void;
	decreaseQuantityItem: (item: IProductCart) => void;
	increaseQuantityItem: (item: IProductCart) => void;
	getTotalPrice: () => number;
};

const useCart = createWithEqualityFn<CartStore>()(
	devtools(
		persist(
			(set, get) => ({
				cart: [],
				addItem: (item) => {
					const foundItem = get().cart.find(({ id }) => id === item.id);

					if (foundItem) {
						set(
							(state) => ({
								cart: state.cart.map((item) => {
									return item.id === foundItem.id ? { ...item, quantity: item.quantity + 1 } : item;
								}),
							}),
							false,
							"addItem",
						);
					} else {
						set(
							(state) => ({ cart: state.cart.concat({ ...item, quantity: 1 }) }),
							false,
							"addItem",
						);
					}
				},
				removeItem: (item) => {
					set(
						(state) => ({
							cart: state.cart.filter(({ id }) => id !== item.id),
						}),
						false,
						"removeItem",
					);
				},
				decreaseQuantityItem: (item) => {
					const foundItem = get().cart.find(({ id }) => id === item.id);

					if (foundItem) {
						set(
							(state) => ({
								cart: state.cart.map((item) => {
									if (item.quantity > 1) {
										return item.id === foundItem.id
											? { ...item, quantity: item.quantity - 1 }
											: item;
									}

									return item;
								}),
							}),
							false,
							"decreaseQuantityItem",
						);
					}
				},
				increaseQuantityItem: (item) => {
					const foundItem = get().cart.find(({ id }) => id === item.id);

					if (foundItem) {
						set(
							(state) => ({
								cart: state.cart.map((item) => {
									return item.id === foundItem.id ? { ...item, quantity: item.quantity + 1 } : item;
								}),
							}),
							false,
							"increaseQuantityItem",
						);
					}
				},
				getTotalPrice: () => {
					return get().cart.reduce((prev, item) => prev + item.quantity * item.price, 0);
				},
			}),
			{
				name: NAME_STORAGES.CART,
				storage: createJSONStorage(() => localStorage),
			},
		),
		{
			name: "cart_store",
		},
	),
	shallow,
);

export default useCart;
