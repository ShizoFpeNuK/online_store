"use client";

import styles from "./WrapperUserForm.module.scss";
import useUser from "@/stores/useUser";
import UserRegForm from "../UserRegForm/UserRegForm";
import { FC } from "react";

const WrapperUserForm: FC = () => {
	const [showForm, setShowForm] = useUser((state) => [state.showForm, state.setShowForm]);

	const handleClick = () => {
		setShowForm(false);
	};

	return showForm ? (
		<>
			<div
				className={styles.overlay}
				onClick={handleClick}
			/>
			<UserRegForm closeForm={handleClick} />
		</>
	) : null;
};

export default WrapperUserForm;
