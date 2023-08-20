import Favorites from "@/components/Favorites/Favorites";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Favorites | Online Store",
	description: "Favorites list",
};

const FavoritesPage: NextPage = () => {
	return <Favorites />;
};

export default FavoritesPage;
