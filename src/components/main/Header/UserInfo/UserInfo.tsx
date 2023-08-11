"use client";

import styles from "./UserInfo.module.scss";
import useUser from "@/stores/useUser";
import { FC } from "react";

const UserInfo: FC = () => {
	const [user, setShowForm] = useUser((state) => [state.user, state.setShowForm]);

	const handleClick = () => {
		if (!user) {
			setShowForm(true);
		}
	};

	return (
		<div
			className={styles.user}
			onClick={handleClick}
		>
			<div
				className={styles.avatar}
				style={{ backgroundImage: "url(/avatar.jpg)" }}
			/>
			<div className={styles.username}>Guest</div>
		</div>
	);
};

export default UserInfo;
