import "./globals.scss";
import Poster from "@/components/Poster/Poster";
import Header from "@/components/main/Header/Header";
import Footer from "@/components/main/Footer/Footer";
import SideBar from "@/components/main/SideBar/SideBar";
import WrapperProducts from "@/components/Products/WrapperProducts/WrapperProducts";
import WrapperCategories from "@/components/Categories/WrapperCategories/WrapperCategories";
import { FC, ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "$taff | Online Store",
	description: "Shop branded sneakers",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
	const amount: number = 5;

	return (
		<html lang="en">
			<body className="container">
				<Header />
				<main className="wrapper">
					<SideBar />
					<Poster />
					<WrapperProducts
						title="Trending"
						amount={amount}
					/>
					<WrapperCategories
						title="Worth seeing"
						amount={amount}
					/>
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
