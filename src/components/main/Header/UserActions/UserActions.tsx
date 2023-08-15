"use client";

import styles from "./UserActions.module.scss";
import Link from "next/link";
import useCart from "@/stores/useCart";
import { ROUTES } from "@/utils/routes";
import { FC, useEffect, useState } from "react";

const UserActions: FC = () => {
	const cart = useCart((state) => state.cart);
	const [amountPurchases, setAmountPurchases] = useState<number>(0);

	const handleStorage = (event: StorageEvent) => {
		if (event.key === "cart_storage") {
			useCart.persist.rehydrate();
		}
	};

	useEffect(() => {
		window.addEventListener("storage", handleStorage);

		return () => {
			window.removeEventListener("storage", handleStorage);
		};
	}, []);

	useEffect(() => {
		if (cart) {
			setAmountPurchases(cart.length);
		}
	}, [cart]);

	return (
		<div className={styles.account}>
			<Link
				href={ROUTES.FAVORITES}
				className={styles.favourites}
			>
				<svg className={styles["icon-fav"]}>
					<use href="/sprite.svg#heart" />
				</svg>
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
