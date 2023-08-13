"use client";

import styles from "../UserForm.module.scss";
import useUser from "@/stores/useUser";
import RegLogForm from "@/components/tools/forms/RegLogForm/RegLogForm";
import { ICreateUser } from "@/models/user.model";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

interface IUserRefForm {
	closeForm: () => void;
	clickLink: () => void;
}

const UserRegForm: FC<IUserRefForm> = ({ closeForm, clickLink }) => {
	const registerUser = useUser((state) => state.registerUser);
	const [values, setValues] = useState<ICreateUser>({
		name: "",
		email: "",
		password: "",
		avatar: "",
	});

	const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const isNotEmpty = Object.values(values).every((val) => val);

		if (isNotEmpty) {
			registerUser(values);
			closeForm();
		}
	};

	return (
		<RegLogForm
			closeForm={closeForm}
			clickLink={clickLink}
			onSubmit={onSubmit}
			titleForm="Register"
			textLink="I already have an account"
			textSubmit="Create an account"
		>
			<div className={styles.group}>
				<input
					type="email"
					name="email"
					placeholder="Your email"
					value={values.email}
					required
					onChange={handleChange}
				/>
			</div>
			<div className={styles.group}>
				<input
					type="name"
					name="name"
					placeholder="Your name"
					value={values.name}
					required
					onChange={handleChange}
				/>
			</div>
			<div className={styles.group}>
				<input
					type="password"
					name="password"
					placeholder="Your password"
					value={values.password}
					required
					onChange={handleChange}
				/>
			</div>
			<div className={styles.group}>
				<input
					type="avatar"
					name="avatar"
					placeholder="Your avatar"
					value={values.avatar}
					required
					onChange={handleChange}
				/>
			</div>
		</RegLogForm>
	);
};

export default UserRegForm;
