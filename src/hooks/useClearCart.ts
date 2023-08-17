import useCart from "@/stores/useCart";
import { useEffect } from "react";
import { NAME_STORAGES } from "@/utils/storages/nameStorages";

const useClearCart = (clearTime: number) => {
	const checkTime = 30 * 1000;

	useEffect(() => {
		const intervalId = setInterval(() => {
			const time = localStorage.getItem(NAME_STORAGES.CLEAR_CART);

			if (time && Date.now() - Number(time) >= clearTime) {
				localStorage.removeItem(NAME_STORAGES.CLEAR_CART);
				useCart.setState({ cart: [] });
			}
		}, checkTime);

		return () => {
			clearInterval(intervalId);
		};
	}, [clearTime, checkTime]);
};

export default useClearCart;
