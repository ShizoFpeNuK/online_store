"use client";

import styles from "./UserActions.module.scss";
import Link from "next/link";
import useCart from "@/stores/useCart";
import useFavorites from "@/stores/useFavorites";
import { ROUTES } from "@/utils/routes";
import { NAME_STORAGES } from "@/utils/storages/nameStorages";
import { FC, useEffect, useState } from "react";

const UserActions: FC = () => {
	const cart = useCart((state) => state.cart);
	const favorites = useFavorites((state) => state.favorites);
	const [amountPurchases, setAmountPurchases] = useState<number>(0);
	const [hasFavorites, setHasFavorites] = useState<boolean>(false);

	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key === NAME_STORAGES.CART) {
				useCart.persist.rehydrate();
			}

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
		const time = localStorage.getItem(NAME_STORAGES.CLEAR_CART);
		setAmountPurchases(cart.length);

		if (cart.length && !time) {
			localStorage.setItem(NAME_STORAGES.CLEAR_CART, Date.now().toString());
		}

		if (!cart.length && time) {
			localStorage.removeItem(NAME_STORAGES.CLEAR_CART);
		}
	}, [cart]);

	useEffect(() => {
		if (favorites.length) {
			setHasFavorites(true);
		} else {
			setHasFavorites(false);
		}
	}, [favorites]);

	return (
		<div className={styles.account}>
			<Link
				href={ROUTES.FAVORITES}
				className={styles.favourites}
			>
				<svg className={styles["icon-fav"]}>
					<use href="/sprite.svg#heart" />
				</svg>
				{hasFavorites && <span className={styles.count} />}
			</Link>
			<Link
				href={ROUTES.CART}
				className={styles.cart}
			>
				<svg className={styles["icon-cart"]}>
					<use href="/sprite.svg#bag" />
				</svg>
				{!!amountPurchases && <span className={styles.count}>{amountPurchases}</span>}
			</Link>
		</div>
	);
};

export default UserActions;
