import styles from "./Products.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/utils/routes";
import { IProduct } from "@/models/product.model";
import { CSSProperties, FC } from "react";

interface IProducts {
	title: string;
	products: IProduct[];
	amount: number;
	style?: CSSProperties;
}

const Products: FC<IProducts> = ({ title, products, amount, style }) => {
	const list = products.filter((_, i) => i < amount);

	return (
		<section
			className={styles.products}
			style={style}
		>
			<h2 className={styles.header}>{title}</h2>
			<div className={styles.list}>
				{list.map((product) => (
					<Link
						className={styles.product}
						key={product.id}
						href={`${ROUTES.PRODUCTS}/${product.id}`}
					>
						<Image
							src={product.images[0]}
							width={200}
							height={200}
							alt={`Image ${product.title}`}
							className={styles.image}
						/>
						<div className={styles.wrapper}>
							<h3 className={styles.title}>{product.title}</h3>
							<p className={styles.category}>{product.category.name}</p>
							<div className={styles.info}>
								<div className={styles.prices}>
									<span className={styles.price}>{product.price}$</span>
									<span className={styles.oldPrice}>{Math.floor(product.price * 0.8)}$</span>
								</div>
								<div className={styles.purchases}>{Math.floor(Math.random() * 20 + 1)} purchased</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Products;
