"use client";

import styles from "./SingleCategory.module.scss";
import useSWR from "swr";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
import useCategories from "@/stores/useCategories";
import ProductsService from "@/services/products.service";
import { IProduct } from "@/models/product.model";
import { ParamsProducts } from "@/types/paramsProducts";
import {
	ChangeEventHandler,
	FC,
	FormEventHandler,
	MouseEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";

const fetcher = async (params?: ParamsProducts) => {
	const products = await ProductsService.getAll(params);

	return products;
};

interface ISingleCategory {
	categoryId: number | string;
}

const SingleCategory: FC<ISingleCategory> = ({ categoryId }) => {
	const defaultValues: ParamsProducts = {
		title: "",
		price_min: 0,
		price_max: 0,
		categoryId: categoryId,
	};

	const defaultParams: ParamsProducts = {
		...defaultValues,
		limit: 5,
		offset: 0,
	};

	const categories = useCategories((state) => state.categories);
	const params = useRef<ParamsProducts>(defaultParams);
	const [items, setItems] = useState<IProduct[]>([]);
	const [values, setValues] = useState<ParamsProducts>(defaultValues);
	const [isSeeMore, setIsSeeMore] = useState<boolean>(false);
	const { data, error, mutate, isValidating } = useSWR(`/products/${categoryId}`, () =>
		fetcher(params.current),
	);

	const category = categories.find((category) => category.id === Number(categoryId));

	const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setIsSeeMore(false);
		setItems([]);
		params.current = { ...defaultParams, ...values };
		mutate(params.current);
	};

	const clickSeeMore: MouseEventHandler<HTMLButtonElement> = () => {
		setIsSeeMore(false);
		params.current = {
			...values,
			limit: params.current.limit,
			offset: params.current.offset! + params.current.limit!,
		};
		mutate(params.current);
	};

	const onReset: MouseEventHandler<HTMLButtonElement> = () => {
		params.current = { ...defaultParams };
		mutate(params.current);
	};

	useEffect(() => {
		if (data?.length) {
			setItems((_items) => [..._items, ...data]);
			setIsSeeMore(true);
		}
	}, [data]);

	return (
		<section className={styles.wrapper}>
			<h2 className={styles.title}>{category?.name}</h2>

			<form
				className={styles.filters}
				onSubmit={onSubmit}
			>
				<div className={styles.filter}>
					<input
						type="text"
						name="title"
						onChange={handleChange}
						placeholder="Product name"
						value={values.title}
					/>
				</div>
				<div className={styles.filter}>
					<input
						type="number"
						name="price_min"
						onChange={handleChange}
						placeholder="Min price"
						value={values.price_min}
					/>
				</div>
				<div className={styles.filter}>
					<input
						type="number"
						name="price_max"
						onChange={handleChange}
						placeholder="Max price"
						value={values.price_max}
					/>
				</div>

				<button type="submit">Find</button>
			</form>

			{!items?.length && isValidating ? (
				<div className="preloader">Loading...</div>
			) : error || !items?.length ? (
				<div className={styles.back}>
					<span>No results</span>
					<button onClick={onReset}>Reset</button>
				</div>
			) : (
				<ProductsList products={items} />
			)}

			<div className={styles.more}>
				{isSeeMore ? (
					<button onClick={clickSeeMore}>See more</button>
				) : (
					isValidating && <span>Loading...</span>
				)}
			</div>
		</section>
	);
};

export default SingleCategory;
