"use client";

import Portal from "@/components/popups/Portal";
import styles from "./UserInfo.module.scss";
import useUser from "@/stores/useUser";
import RegLogModal from "@/components/popups/RegLogModal/RegLogModal";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const UserInfo: FC = () => {
	const router = useRouter();
	const user = useUser((state) => state.user);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [avatar, setAvatar] = useState<string>("/avatar.jpg");
	const [name, setName] = useState<string>("Guest");

	const handleClick = () => {
		if (!user) {
			setIsOpen(true);
		} else {
			router.push("/profile");
		}
	};

	useEffect(() => {
		if (user) {
			setAvatar(user.avatar);
			setName(user.name);
		} else {
			setAvatar("/avatar.jpg");
			setName("Guest");
		}
	}, [user]);

	return (
		<>
			<div
				className={styles.user}
				onClick={handleClick}
			>
				<div
					className={styles.avatar}
					style={{ backgroundImage: `url(${avatar})` }}
				/>
				<div className={styles.username}>{name}</div>
			</div>

			<Portal>{isOpen && <RegLogModal onClose={() => setIsOpen(false)} />}</Portal>
		</>
	);
};

export default UserInfo;
