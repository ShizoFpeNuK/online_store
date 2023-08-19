"use client";

import styles from "./ReturnToCart.module.scss";
import { FC } from "react";
import { IProductCart } from "@/models/cart.model";
import useCart from "@/stores/useCart";

interface IReturnToCart {
	product: IProductCart;
	onClose: () => void;
}

const ReturnToCart: FC<IReturnToCart> = ({ onClose, product }) => {
	const addItem = useCart((state) => state.addItem);

	const addProductToCart = () => {
		addItem(product);
		onClose();
	};

	return (
		<div className={styles.notification}>
			<div className={styles.text}>
				<h3 className={styles.title}>Notification</h3>
				<div className={styles.message}>
					Return the <span>{product.title}</span> back to the cart?
				</div>
			</div>

			<button onClick={addProductToCart}>Return</button>

			<div
				className={styles.close}
				onClick={onClose}
			>
				<svg className={styles.icon}>
					<use href="/sprite.svg#close" />
				</svg>
			</div>
		</div>
	);
};

export default ReturnToCart;
