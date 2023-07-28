"use client";

import styles from "./SideBar.module.scss";
import NavLink from "../../router/NavLink";
import CategoriesStore from "@/stores/categories.store";
import { ROUTES } from "@/utils/routes";
import { observer } from "mobx-react";
import { FC, useEffect } from "react";

const categoriesStore = new CategoriesStore();

const NavCategories: FC = observer(() => {
	useEffect(() => {
		categoriesStore.getCategories();
	}, []);

	return (
		<nav>
			{!categoriesStore.isLoading ? (
				<ul className={styles.menu}>
					{categoriesStore.categories.map(({ name, id }) => (
						<li key={id}>
							<NavLink
								href={`${ROUTES.CATEGORY}/${id}`}
								className={styles.link}
								activeStyle={styles.active}
							>
								{name}
							</NavLink>
						</li>
					))}
				</ul>
			) : (
				<p>Loading...</p>
			)}
		</nav>
	);
});

export default NavCategories;
