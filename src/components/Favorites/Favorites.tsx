"use client";

import styles from "./Favorites.module.scss";
import Link from "next/link";
import useCart from "@/stores/useCart";
import useFavorites from "@/stores/useFavorites";
import { ROUTES } from "@/utils/routes";
import { NAME_STORAGES } from "@/utils/storages/nameStorages";
import { IProductFavorites } from "@/models/favorites.model";
import { FC, useEffect, useState } from "react";

const Favorites: FC = () => {
	const addItemToCart = useCart((state) => state.addItem);
	const [items, setItems] = useState<IProductFavorites[]>([]);
	const [favorites, removeItemFromFav] = useFavorites((state) => [
		state.favorites,
		state.removeItem,
	]);

	const addToCart = (item: IProductFavorites) => {
		addItemToCart(item);
		removeItemFromFav(item);
	};

	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key === NAME_STORAGES.FAVORITES) {
				useFavorites.persist.rehydrate();
			}
		};

		window.addEventListener("storage", handleStorage);

		return () => {
			window.removeEventListener("storage", handleStorage);
		};
	}, []);

	useEffect(() => {
		setItems(favorites);
	}, [favorites]);

	return (
		<section className={styles.favorites}>
			<h2 className={styles.title}>Your favorites</h2>

			{!items.length ? (
				<span className={styles.empty}>Here is empty...</span>
			) : (
				<>
					<div className={styles.list}>
						{items.map((item) => (
							<div
								key={item.id}
								className={styles.item}
							>
								<Link
									href={`${ROUTES.PRODUCTS}/${item.id}`}
									className={styles.image}
									style={{ backgroundImage: `url(${item.images[0]})` }}
									target="_blank"
								/>
								<div className={styles.info}>
									<h3 className={styles.name}>{item.title}</h3>
									<div className={styles.category}>{item.category.name}</div>
								</div>

								<button
									className={styles.buy}
									onClick={() => addToCart(item)}
								>
									Buy
								</button>

								<div className={styles.price}>{item.price}$</div>

								<div
									className={styles.close}
									onClick={() => removeItemFromFav(item)}
								>
									<svg className={styles.icon}>
										<use href="/sprite.svg#close" />
									</svg>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</section>
	);
};

export default Favorites;
