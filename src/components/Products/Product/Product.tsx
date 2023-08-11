import styles from "./Product.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { ROUTES } from "@/utils/routes";
import { IProduct } from "@/models/product.model";

const Product: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<Link
			className={styles.product}
			key={product.id}
			href={`${ROUTES.PRODUCTS}/${product.id}`}
			target="_blank"
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
					<div className={styles.purchases}>17 purchased</div>
				</div>
			</div>
		</Link>
	);
};

export default Product;
