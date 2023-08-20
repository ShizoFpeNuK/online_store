import Cart from "@/components/Cart/Cart";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Cart | Online Store",
	description: "Shopping cart",
};

const CartPage: NextPage = () => {
	return <Cart />;
};

export default CartPage;
