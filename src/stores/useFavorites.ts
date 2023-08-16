import { shallow } from "zustand/shallow";
import { IProduct } from "@/models/product.model";
import { IProductCart } from "@/models/cart.model";
import { NAME_STORAGES } from "@/utils/storages/nameStorages";
import { IProductFavorites } from "@/models/favorites.model";
import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type FavoritesStore = {
	favorites: IProductFavorites[];
	addItem: (item: IProduct | IProductCart) => void;
	removeItem: (item: IProductFavorites) => void;
	hasItem: (item: IProductFavorites) => boolean;
};

const useFavorites = createWithEqualityFn<FavoritesStore>()(
	devtools(
		persist(
			(set, get) => ({
				favorites: [],
				addItem: (item) => {
					const foundItem = get().favorites.find(({ id }) => id === item.id);

					set(
						(state) => ({
							favorites: !foundItem ? state.favorites.concat(item) : state.favorites,
						}),
						false,
						"addItem",
					);
				},
				removeItem: (item) => {
					set(
						(state) => ({
							favorites: state.favorites.filter(({ id }) => id !== item.id),
						}),
						false,
						"removeItem",
					);
				},
				hasItem: (item) => {
					const foundItem = get().favorites.find(({ id }) => id === item.id);

					if (foundItem) {
						return true;
					}

					return false;
				},
			}),
			{
				name: NAME_STORAGES.FAVORITES,
				storage: createJSONStorage(() => localStorage),
			},
		),
		{
			name: "favorites_store",
		},
	),
	shallow,
);

export default useFavorites;
