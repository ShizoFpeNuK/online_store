"use client";

import styles from "./WrapperUserForm.module.scss";
import UserLogForm from "../forms/UserLogForm/UserLogForm";
import UserRegForm from "../forms/UserRegForm/UserRegForm";
import useUser, { formTypes } from "@/stores/useUser";
import { FC } from "react";

const WrapperUserForm: FC = () => {
	const [showForm, setShowForm, formType, setFormType] = useUser((state) => [
		state.showForm,
		state.setShowForm,
		state.formType,
		state.setFormType,
	]);

	const handleClick = () => {
		setShowForm(false);
	};

	const clickLogin = () => {
		setFormType(formTypes.login);
	};

	const clickRegister = () => {
		setFormType(formTypes.register);
	};

	return showForm ? (
		<>
			<div
				className={styles.overlay}
				onClick={handleClick}
			/>
			{formType === formTypes.register ? (
				<UserRegForm
					closeForm={handleClick}
					clickLink={clickLogin}
				/>
			) : (
				<UserLogForm
					closeForm={handleClick}
					clickLink={clickRegister}
				/>
			)}
		</>
	) : null;
};

export default WrapperUserForm;
