import styles from "./Poster.module.scss";
import Image from "next/image";
import { FC } from "react";

const Poster: FC = () => {
	return (
		<section className={styles.home}>
			<div className={styles.title}>BIG SALE 20%</div>
			<div className={styles.product}>
				<div className={styles.text}>
					<div className={styles.subtitle}>the bestseller of 2022 </div>
					<h1 className={styles.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
					<button className={styles.button}>Shop now</button>
				</div>
				<Image
					src="/computer.png"
					width={462}
					height={359}
					alt="Computer"
					className={styles.image}
					priority
				/>
			</div>
		</section>
	);
};

export default Poster;
