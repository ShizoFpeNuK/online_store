import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import UserInfo from "./UserInfo/UserInfo";
import { FC } from "react";
import { ROUTES } from "@/utils/routes";

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href={ROUTES.HOME}>
					<Image
						src="/logo.svg"
						width={78}
						height={32}
						alt="$taff"
						priority
					/>
				</Link>
			</div>

			<div className={styles.info}>
				<UserInfo />

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
						/>
					</div>
				</form>

				{/* <div className={styles.box}></div> */}

				<div className={styles.account}>
					<Link
						href={ROUTES.HOME}
						className={styles.favourites}
					>
						<svg className={styles["icon-fav"]}>
							<use href="/sprite.svg#heart" />
						</svg>
					</Link>
					<Link
						href={ROUTES.CART}
						className={styles.cart}
					>
						<svg className={styles["icon-cart"]}>
							<use href="/sprite.svg#bag" />
						</svg>
						<span className={styles.count}>2</span>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
