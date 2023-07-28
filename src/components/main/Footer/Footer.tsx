"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.scss";
import { FC } from "react";
import { ROUTES } from "@/utils/routes";

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
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

			<div className={styles.rights}>
				Developed by <span className={styles.name}>Tomkovich</span>
			</div>

			<div className={styles.socials}>
				<a
					href="https://www.youtube.com/"
					target="_blank"
					rel="noreferrer"
				>
					<svg>
						<use href="/sprite.svg#youtube" />
					</svg>
				</a>
				<a
					href="#"
					target="_blank"
					rel="noreferrer"
				>
					<svg>
						<use href="/sprite.svg#facebook" />
					</svg>
				</a>
				<a
					href="#"
					target="_blank"
					rel="noreferrer"
				>
					<svg>
						<use href="/sprite.svg#instagram" />
					</svg>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
