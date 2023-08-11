import SingleProduct from "@/components/Products/SingleProduct/SingleProduct";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
import ProductsService from "@/services/products.service";
import { NextPage } from "next";

type PageProps = {
	params: { id: string };
};

export async function generateMetadata({ params: { id } }: PageProps) {
	const product = await ProductsService.getOne(id);

	return {
		title: product.title + " | $taff",
	};
}

export async function generateStaticParams() {
	const products = await ProductsService.getAll();

	return products.map((product) => ({
		id: product.id.toString(),
	}));
}

const ProductsItem: NextPage<PageProps> = async ({ params: { id } }) => {
	const product = await ProductsService.getOne(id);
	const amount: number = 5;

	return (
		<>
			<SingleProduct product={product} />
			<ProductsList
				title="Related products"
				amount={amount}
				relatedInCategoryId={product.category.id}
			/>
		</>
	);
};

export default ProductsItem;
