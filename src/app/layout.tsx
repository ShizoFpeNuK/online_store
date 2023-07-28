import "./globals.scss";
import Header from "@/components/main/Header/Header";
import Footer from "@/components/main/Footer/Footer";
import SideBar from "@/components/main/SideBar/SideBar";
import { FC } from "react";
import { LayoutProps } from "../../.next/types/app/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "$taff | Online Store",
	description: "Shop branded sneakers",
};

const RootLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<html lang="en">
			<body className="container">
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
