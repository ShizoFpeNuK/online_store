import styles from "./SideBar.module.scss";
import NavCategories from "@/components/main/SideBar/NavCategories";
import { FC } from "react";

const SideBar: FC = () => {
	return (
		<aside className={styles.sidebar}>
			<h2 className={styles.title}>CATEGORIES</h2>
			<NavCategories />

			<div className={styles.footer}>
				<a
					href="/help"
					target="_blank"
					className={styles.link}
				>
					Help
				</a>
				<a
					href="/terms"
					target="_blank"
					className={styles.link}
					style={{ textDecoration: "underline" }}
				>
					Terms & Conditions
				</a>
			</div>
		</aside>
	);
};

export default SideBar;
