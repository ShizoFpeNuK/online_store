"use client";

import styles from "./RegLogModal.module.scss";
import UserLogForm from "../../User/forms/UserLogForm/UserLogForm";
import UserRegForm from "../../User/forms/UserRegForm/UserRegForm";
import { FC, useState } from "react";

const formTypes = { register: "register", login: "login" };
interface IRegLogModal {
	onClose: () => void;
}

const RegLogModal: FC<IRegLogModal> = ({ onClose }) => {
	const [formType, setFormType] = useState<string>(formTypes.register);

	const clickLogin = () => {
		setFormType(formTypes.login);
	};

	const clickRegister = () => {
		setFormType(formTypes.register);
	};

	return (
		<>
			<div
				className={styles.overlay}
				onClick={onClose}
			/>
			{formType === formTypes.register ? (
				<UserRegForm
					closeForm={onClose}
					clickLink={clickLogin}
				/>
			) : (
				<UserLogForm
					closeForm={onClose}
					clickLink={clickRegister}
				/>
			)}
		</>
	);
};

export default RegLogModal;
