import Banner from "@/components/Banner/Banner";
import Categories from "@/components/Categories/Categories";
import Poster from "@/components/Poster/Poster";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
import { NextPage } from "next";

const Home: NextPage = () => {
	const amount: number = 5;

	return (
		<>
			<Poster />
			<ProductsList
				title="Trending"
				amount={amount}
			/>
			<Categories
				title="Worth seeing"
				amount={amount}
			/>
			<Banner />
			<ProductsList
				title="Less than 100$"
				amount={amount}
				filterPrice={100}
			/>
		</>
	);
};

export default Home;
