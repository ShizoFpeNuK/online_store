import Image from "next/image";
import styles from "./Banner.module.scss";
import { FC } from "react";

const Banner: FC = () => {
	return (
		<section className={styles.banner}>
			<div className={styles.left}>
				<p className={styles.content}>
					NEW YEAR
					<span>SALE</span>
					<button className={styles.more}>See more</button>
				</p>
			</div>
			<div className={styles.right}>
				<Image
					className={styles.right}
					src="/banner.png"
					alt="Sales"
					width={637}
					height={570}
				/>
				<p className={styles.discount}>
					save up to <span>50%</span> off
				</p>
			</div>
		</section>
	);
};

export default Banner;
