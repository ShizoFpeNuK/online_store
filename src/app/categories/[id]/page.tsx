import Poster from "@/components/Poster/Poster";
import SingleCategory from "@/components/Categories/SingleCategory/SingleCategory";
import CategoriesService from "@/services/categories.service";
import { NextPage } from "next";

type PageProps = {
	params: {
		id: string;
	};
};

export async function generateMetadata({ params: { id } }: PageProps) {
	const category = await CategoriesService.getOne(id);

	return {
		title: category.name + " | $taff",
	};
}

export async function generateStaticParams() {
	const categories = await CategoriesService.getAll();

	return categories.map((category) => ({
		id: category.id.toString(),
	}));
}

const CategoriesItem: NextPage<PageProps> = ({ params: { id } }) => {
	return (
		<>
			<Poster />
			<SingleCategory categoryId={id} />
		</>
	);
};

export default CategoriesItem;
