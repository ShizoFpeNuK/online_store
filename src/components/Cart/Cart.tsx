"use client";

import styles from "./Cart.module.scss";
import Link from "next/link";
import useCart from "@/stores/useCart";
import useFavorites from "@/stores/useFavorites";
import useSyncCartAndFav from "@/hooks/useSyncCartAndFav";
import { ROUTES } from "@/utils/routes";
import { IProductCart } from "@/models/cart.model";
import { FC, useEffect, useState } from "react";

const Cart: FC = () => {
	const addItemToFav = useFavorites((state) => state.addItem);
	const [items, setItems] = useState<IProductCart[]>([]);
	const [cart, getTotalPrice, decreaseQuantityItem, increaseQuantityItem, removeItemToCart] =
		useCart((state) => [
			state.cart,
			state.getTotalPrice,
			state.decreaseQuantityItem,
			state.increaseQuantityItem,
			state.removeItem,
		]);

	// Синхронизация корзины на других вкладках
	useSyncCartAndFav(true);

	const addToFav = (item: IProductCart) => {
		addItemToFav(item);
		removeItemToCart(item);
	};

	useEffect(() => {
		setItems(cart);
	}, [cart]);

	return (
		<section className={styles.cart}>
			<h2 className={styles.title}>Your cart</h2>

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

								<div className={styles.price}>{item.price}$</div>

								<div className={styles.quantity}>
									<div
										className={styles.minus}
										onClick={() => decreaseQuantityItem(item)}
									>
										<svg className={styles.icon}>
											<use href="/sprite.svg#minus" />
										</svg>
									</div>

									<span>{item.quantity}</span>

									<div
										className={styles.plus}
										onClick={() => increaseQuantityItem(item)}
									>
										<svg className={styles.icon}>
											<use href="/sprite.svg#plus" />
										</svg>
									</div>
								</div>

								<div className={styles.total}>{item.price * item.quantity}$</div>

								<div
									className={styles.favorites}
									onClick={() => addToFav(item)}
								>
									<svg className={styles["icon-fav"]}>
										<use href="/sprite.svg#heart" />
									</svg>
								</div>

								<div
									className={styles.close}
									onClick={() => removeItemToCart(item)}
								>
									<svg className={styles.icon}>
										<use href="/sprite.svg#close" />
									</svg>
								</div>
							</div>
						))}
					</div>

					<div className={styles.actions}>
						<div className={styles.total}>
							TOTAL PRICE: <span>{getTotalPrice()}$</span>
						</div>

						<button className={styles.proceed}>Proceed to checkout</button>
					</div>
				</>
			)}
		</section>
	);
};

export default Cart;
