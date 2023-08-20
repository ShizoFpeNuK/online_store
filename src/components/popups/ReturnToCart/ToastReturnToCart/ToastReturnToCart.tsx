"use client";

import styles from "./ToastReturnToCart.module.scss";
import ReturnToCart from "../ReturnToCart";
import { IProductCart } from "@/models/cart.model";
import { FC, useEffect, useState } from "react";

interface IToastReturnToCart {
	products: IProductCart | null;
}

const ToastReturnToCart: FC<IToastReturnToCart> = ({ products }) => {
	const [toast, setToast] = useState<IProductCart[]>([]);

	const onClose = (id: number) => {
		setToast(toast.filter((item) => item.id !== id));
	};

	// Автоматическая очистка уведомлений
	useEffect(() => {
		if (products) {
			setToast((items) => [...items, products]);

			setTimeout(() => {
				setToast((items) => items.filter((item) => item.id !== products.id));
			}, 10000);
		}
	}, [products]);

	return (
		<div className={styles.wrapper}>
			{toast.map((item) => (
				<ReturnToCart
					key={item.id}
					product={item}
					onClose={() => onClose(item.id)}
				/>
			))}
		</div>
	);
};

export default ToastReturnToCart;
