"use client";

import styles from "./CategoriesList.module.scss";
import Link from "next/link";
import Image from "next/image";
import useCategories from "@/stores/useCategories";
import { FC } from "react";
import { ROUTES } from "@/utils/routes";

interface ICategories {
	title: string;
	amount: number;
}

const CategoriesList: FC<ICategories> = ({ title, amount }) => {
	const [categories] = useCategories((state) => [state.categories]);

	return (
		<section className={styles.categories}>
			<h2 className={styles.header}>{title}</h2>
			<div className={styles.list}>
				{categories
					.filter((_, i) => i < amount)
					.map((category) => (
						<Link
							key={category.id}
							href={`${ROUTES.CATEGORY}/${category.id}`}
							className={styles.item}
						>
							<Image
								src={category.image}
								width={200}
								height={200}
								alt={`Image ${category.name}`}
								className={styles.image}
							/>
							<h3 className={styles.title}>{category.name}</h3>
						</Link>
					))}
			</div>
		</section>
	);
};

export default CategoriesList;
