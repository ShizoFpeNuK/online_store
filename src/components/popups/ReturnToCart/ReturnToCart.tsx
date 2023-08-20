"use client";

import styles from "./ReturnToCart.module.scss";
import useCart from "@/stores/useCart";
import { FC } from "react";
import { IProductCart } from "@/models/cart.model";

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
		<div className={styles.notification} onClick={onClose}>
			<div className={styles.text}>
				<h3 className={styles.title}>Notification</h3>
				<div className={styles.message}>
					Return the <span>{product.title}</span> back to the cart?
				</div>
			</div>

			<button onClick={addProductToCart}>Return</button>
		</div>
	);
};

export default ReturnToCart;
