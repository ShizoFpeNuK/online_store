"use client";

import styles from "./SingleProduct.module.scss";
import Link from "next/link";
import Image from "next/image";
import useCart from "@/stores/useCart";
import useFavorites from "@/stores/useFavorites";
import { ROUTES } from "@/utils/routes";
import { IProduct } from "@/models/product.model";
import { FC, useEffect, useState } from "react";

interface ISingleProduct {
	product: IProduct;
}

const SIZES = [4, 4.5, 5];

const SingleProduct: FC<ISingleProduct> = ({ product }) => {
	const addItemToCart = useCart((state) => state.addItem);
	const [hasInFavorites, setHasInFavorites] = useState<boolean>(false);
	const [favorites, addItemToFavorites, removeItemFromFavorites, hasItemInFavorites] = useFavorites(
		(state) => [state.favorites, state.addItem, state.removeItem, state.hasItem],
	);
	const [currentImage, setCurrentImage] = useState<string>(product.images[0]);
	const [currentSize, setCurrentSize] = useState<number | null>(null);

	const checkItemInFavorites = (item: IProduct) => {
		const hasItem = hasItemInFavorites(item);

		setHasInFavorites(!hasItem);

		if (hasItem) {
			removeItemFromFavorites(item);
		} else {
			addItemToFavorites(item);
		}
	};

	useEffect(() => {
		const hasItem = hasItemInFavorites(product);

		if (hasItem) {
			setHasInFavorites(true);
		} else {
			setHasInFavorites(false);
		}
	}, [hasItemInFavorites, product, favorites]);

	return (
		<section className={styles.product}>
			<div className={styles.images}>
				<Image
					className={styles.current}
					src={currentImage}
					alt="Current image product"
					width={375}
					height={375}
				/>
				<div className={styles["images-list"]}>
					{product.images.map((image, index) => (
						<Image
							key={index}
							className={styles.image}
							src={image}
							alt="Image product"
							width={90}
							height={90}
							onClick={() => setCurrentImage(image)}
						/>
					))}
				</div>
				<div className={styles.info}>
					<h1 className={styles.title}>{product.title}</h1>
					<div className={styles.price}>{product.price}$</div>
					<div className={styles.color}>
						<span>Color:</span> Green
					</div>
					<div className={styles.sizes}>
						<span>Sizes:</span>
						<div className={styles.list}>
							{SIZES.map((size) => (
								<div
									key={size}
									className={`${styles.size} ${currentSize === size ? styles.active : ""}`}
									onClick={() => setCurrentSize(size)}
								>
									{size}
								</div>
							))}
						</div>
					</div>

					<p className={styles.description}>{product.description}</p>

					<div className={styles.actions}>
						<button
							className={styles.add}
							disabled={!currentSize}
							onClick={() => addItemToCart(product)}
						>
							Add to cart
						</button>

						<button
							className={styles.favourite}
							onClick={() => checkItemInFavorites(product)}
						>
							{!hasInFavorites ? "Add to favorites" : "Remove from favorites"}
						</button>
					</div>

					<div className={styles.bottom}>
						<div className={styles.purchase}>19 people purchased</div>
						<Link
							className={styles.link_home}
							href={ROUTES.HOME}
						>
							Return to store
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SingleProduct;
