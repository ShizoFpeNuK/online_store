"use client";

import styles from "../UserForm.module.scss";
import useUser from "@/stores/useUser";
import RegLogForm from "@/components/tools/forms/RegLogForm/RegLogForm";
import { ILoginUser } from "@/models/user.model";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

interface IUserLogForm {
	closeForm: () => void;
	clickLink: () => void;
}

const UserLogForm: FC<IUserLogForm> = ({ closeForm, clickLink }) => {
	const loginUser = useUser((state) => state.loginUser);
	const [values, setValues] = useState<ILoginUser>({
		email: "",
		password: "",
	});

	const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const isNotEmpty = Object.values(values).every((val) => val);

		if (isNotEmpty) {
			loginUser(values);
			closeForm();
		}
	};

	return (
		<RegLogForm
			closeForm={closeForm}
			clickLink={clickLink}
			onSubmit={onSubmit}
			titleForm="Log in"
			textLink="Create an account"
			textSubmit="Log in"
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
					type="password"
					name="password"
					placeholder="Your password"
					value={values.password}
					required
					onChange={handleChange}
				/>
			</div>
		</RegLogForm>
	);
};

export default UserLogForm;
