import "./globals.scss";
import Header from "@/components/main/Header/Header";
import Footer from "@/components/main/Footer/Footer";
import SideBar from "@/components/main/SideBar/SideBar";
import ProductsService from "@/services/products.service";
import StoreInitializer from "@/components/main/StoreInitializer/StoreInitializer";
import CategoriesService from "@/services/categories.service";
import { FC, ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "$taff | Online Store",
	description: "Shop branded sneakers",
};

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
	const products = await ProductsService.getAll();
	const categories = await CategoriesService.getAll();

	return (
		<html lang="en">
			<body className="container">
				<div
					id="portal"
					style={{ position: "relative", zIndex: 1000 }}
				/>
				<StoreInitializer
					products={products}
					categories={categories}
				/>
				<Header />
				<main className="wrapper">
					<SideBar />
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
