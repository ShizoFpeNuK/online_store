"use client";

import styles from "./Cart.module.scss";
import Link from "next/link";
import Portal from "../popups/Portal";
import useCart from "@/stores/useCart";
import useFavorites from "@/stores/useFavorites";
import useSyncCartAndFav from "@/hooks/useSyncCartAndFav";
import ToastReturnToCart from "../popups/ReturnToCart/ToastReturnToCart/ToastReturnToCart";
import { ROUTES } from "@/utils/routes";
import { IProductCart } from "@/models/cart.model";
import { FC, useEffect, useState } from "react";

const Cart: FC = () => {
	const addItemToFav = useFavorites((state) => state.addItem);
	const [items, setItems] = useState<IProductCart[]>([]);
	const [returnProducts, setReturnProducts] = useState<IProductCart | null>(null);
	const [cart, getTotalPrice, decreaseQuantityItem, increaseQuantityItem, removeItemFromCart] =
		useCart((state) => [
			state.cart,
			state.getTotalPrice,
			state.decreaseQuantityItem,
			state.increaseQuantityItem,
			state.removeItem,
		]);

	// Синхронизация корзины на других вкладках
	useSyncCartAndFav(true);

	const removeItemWithPopup = (product: IProductCart) => {
		removeItemFromCart(product);
		setReturnProducts(product);
	};

	const addToFav = (product: IProductCart) => {
		addItemToFav(product);
		removeItemFromCart(product);
	};

	useEffect(() => {
		setItems(cart);
	}, [cart]);

	return (
		<>
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
										onClick={() => removeItemWithPopup(item)}
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

			<Portal>
				<ToastReturnToCart products={returnProducts} />
			</Portal>
		</>
	);
};

export default Cart;
