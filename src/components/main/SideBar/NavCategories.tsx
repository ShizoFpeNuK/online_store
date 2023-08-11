"use client";

import styles from "./SideBar.module.scss";
import NavLink from "../../router/NavLink";
import useCategories from "@/stores/useCategories";
import { FC } from "react";
import { ROUTES } from "@/utils/routes";

const NavCategories: FC = () => {
	const categories = useCategories((state) => state.categories);
	const amount = 5;

	return (
		<nav>
			<ul className={styles.menu}>
				{categories
					.filter((_, i) => {
						return i < amount;
					})
					.map(({ name, id }) => (
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
		</nav>
	);
};

export default NavCategories;
