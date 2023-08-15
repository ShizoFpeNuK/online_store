import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import UserInfo from "./UserInfo/UserInfo";
import UserActions from "./UserActions/UserActions";
import SearchProducts from "./SearchProducts/SearchProducts";
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
				<SearchProducts />
				<UserActions />
			</div>
		</header>
	);
};

export default Header;
