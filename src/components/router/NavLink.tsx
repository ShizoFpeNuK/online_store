"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface INavLink {
	href: string;
	children?: ReactNode;
	className?: string;
	activeStyle: string;
}

export const NavLink: FC<INavLink> = ({ href, children, className, activeStyle }) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	if (isActive) {
		className += ` ${activeStyle}`;
	}

	return (
		<Link
			href={href}
			className={className}
		>
			{children}
		</Link>
	);
};

export default NavLink;
