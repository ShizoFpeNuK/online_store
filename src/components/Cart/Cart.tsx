"use client";

import styles from "./Cart.module.scss";
import useCart from "@/stores/useCart";
import { FC, useEffect } from "react";

const Cart: FC = () => {
	const [cart, getTotalPrice, decreaseQuantityItem, increaseQuantityItem, removeItem] =
		useCart((state) => [
			state.cart,
			state.getTotalPrice,
			state.decreaseQuantityItem,
			state.increaseQuantityItem,
			state.removeItem,
			state.setCart,
		]);

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

	return (
		<section className={styles.cart}>
			<h2 className={styles.title}>Your cart</h2>

			{!cart.length ? (
				<span className={styles.empty}>Here is empty...</span>
			) : (
				<>
					<div className={styles.list}>
						{cart.map((item) => (
							<div
								key={item.id}
								className={styles.item}
							>
								<div
									className={styles.image}
									style={{ backgroundImage: `url(${item.images[0]})` }}
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
									className={styles.close}
									onClick={() => removeItem(item)}
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
