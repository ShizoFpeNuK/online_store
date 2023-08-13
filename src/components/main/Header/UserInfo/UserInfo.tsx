"use client";

import styles from "./UserInfo.module.scss";
import useUser from "@/stores/useUser";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const UserInfo: FC = () => {
	const [user, setShowForm] = useUser((state) => [state.user, state.setShowForm]);
	const [avatar, setAvatar] = useState<string>("/avatar.jpg");
	const [name, setName] = useState<string>("Guest");
	const router = useRouter();

	const handleClick = () => {
		if (!user) {
			setShowForm(true);
		} else {
			router.push("/profile");
		}
	};

	useEffect(() => {
		if (user) {
			setAvatar(user.avatar);
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
				style={{ backgroundImage: `url(${avatar})` }}
			/>
			<div className={styles.username}>{name}</div>
		</div>
	);
};

export default UserInfo;
