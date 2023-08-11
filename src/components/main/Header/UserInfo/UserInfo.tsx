"use client";

import styles from "./UserInfo.module.scss";
import useUser from "@/stores/useUser";
import { FC, useEffect, useState } from "react";

const UserInfo: FC = () => {
	const [image, setImage] = useState<string>("/avatar.jpg");
	const [name, setName] = useState<string>("Guest");
	const [user, setShowForm] = useUser((state) => [state.user, state.setShowForm]);

	const handleClick = () => {
		if (!user) {
			setShowForm(true);
		}
	};

	useEffect(() => {
		if (user) {
			setImage(user.avatar);
			setName(user.name);
		}
	}, [user]);

	return (
		<div
			className={styles.user}
			onClick={handleClick}
		>
			<div
				className={styles.avatar}
				style={{ backgroundImage: `url(${image})` }}
			/>
			<div className={styles.username}>{name}</div>
		</div>
	);
};

export default UserInfo;