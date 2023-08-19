"use client";

import styles from "./Profile.module.scss";
import Portal from "../popups/Portal";
import useUser from "@/stores/useUser";
import RegLogModal from "../popups/RegLogModal/RegLogModal";
import ProfileForm from "./ProfileForm/ProfileForm";
import { FC, useEffect, useState } from "react";

const Profile: FC = () => {
	const user = useUser((state) => state.user);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [hasUser, setHasUser] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			setHasUser(true);
		} else {
			setHasUser(false);
		}
	}, [user]);

	return (
		<>
			<div className={styles.profile}>
				{!hasUser ? (
					<div
						className={styles.login}
						onClick={() => setIsOpen(true)}
					>
						You need to log in
					</div>
				) : (
					<ProfileForm />
				)}
			</div>

			<Portal>{isOpen && <RegLogModal onClose={() => setIsOpen(false)} />}</Portal>
		</>
	);
};

export default Profile;
