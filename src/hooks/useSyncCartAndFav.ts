import useCart from "@/stores/useCart";
import useFavorites from "@/stores/useFavorites";
import { useEffect } from "react";
import { NAME_STORAGES } from "@/utils/storages/nameStorages";

const useSyncCartAndFav = (isSyncCart?: boolean, isSyncFav?: boolean) => {
	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key === NAME_STORAGES.CART && isSyncCart) {
				useCart.persist.rehydrate();
			}

			if (event.key === NAME_STORAGES.FAVORITES && isSyncFav) {
				useFavorites.persist.rehydrate();
			}
		};

		window.addEventListener("storage", handleStorage);

		return () => {
			window.removeEventListener("storage", handleStorage);
		};
	}, [isSyncCart, isSyncFav]);
};

export default useSyncCartAndFav;
