"use client";

import styles from "./SearchProducts.module.scss";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import ProductsService from "@/services/products.service";
import { ROUTES } from "@/utils/routes";
import { ChangeEventHandler, FC, useState } from "react";

const SearchProducts: FC = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const { data, trigger, isMutating } = useSWRMutation("/products", (_, { arg }: { arg: string }) =>
		ProductsService.getAll({ title: arg }),
	);

	const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
		setSearchValue(value);
		trigger(value);
	};

	return (
		<form className={styles.form}>
			<div className={styles.icon}>
				<svg className={styles.icon}>
					<use href="/sprite.svg#search" />
				</svg>
			</div>
			<div className={styles.input}>
				<input
					type="search"
					name="search"
					placeholder="Search for anything..."
					autoComplete="off"
					value={searchValue}
					onChange={handleChange}
				/>
			</div>

			{searchValue && (
				<div className={styles.box}>
					{isMutating
						? "Loading..."
						: !data?.length
						  ? "No results"
						  : data.map(({ title, images, id }) => (
								<Link
									key={id}
									className={styles.item}
									href={`${ROUTES.PRODUCTS}/${id}`}
									onClick={() => setSearchValue("")}
									target="_blank"
								>
									<div
										className={styles.image}
										style={{ backgroundImage: `url(${images[0]})` }}
									/>
									<div className={styles.title}>{title}</div>
								</Link>
						  ))}
				</div>
			)}
		</form>
	);
};

export default SearchProducts;
