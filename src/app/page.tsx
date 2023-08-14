import Banner from "@/components/Banner/Banner";
import Poster from "@/components/Poster/Poster";
import CategoriesList from "@/components/Categories/CategoriesList/CategoriesList";
import ProductsWithStore from "@/components/Products/ProductsWithStore/ProductsWithStore";
import { NextPage } from "next";

const Home: NextPage = () => {
	const amount: number = 5;

	return (
		<>
			<Poster />
			<ProductsWithStore
				title="Trending"
				amount={amount}
			/>
			<CategoriesList
				title="Worth seeing"
				amount={amount}
			/>
			<Banner />
			<ProductsWithStore
				title="Less than 100$"
				amount={amount}
				filterPrice={100}
			/>
		</>
	);
};

export default Home;
