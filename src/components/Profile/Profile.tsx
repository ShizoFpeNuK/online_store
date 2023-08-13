"use client";

import styles from "./Profile.module.scss";
import useUser from "@/stores/useUser";
import ProfileForm from "./ProfileForm/ProfileForm";
import { FC, useEffect, useState } from "react";

const Profile: FC = () => {
	const user = useUser((state) => state.user);
	const [hasUser, setHasUser] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			setHasUser(true);
		} else {
			setHasUser(false);
		}
	}, [user]);

	return (
		<div className={styles.profile}>
			{!hasUser ? <div className={styles.login}>You need to log in</div> : <ProfileForm />}
		</div>
	);
};

export default Profile;
