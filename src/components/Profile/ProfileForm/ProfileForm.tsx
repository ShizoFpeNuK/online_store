"use client";

import styles from "./ProfileForm.module.scss";
import useUser from "@/stores/useUser";
import { IUpdateUser } from "@/models/user.model";
import { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from "react";

const ProfileForm: FC = () => {
	const [user, updateUser, logout] = useUser((state) => [
		state.user,
		state.updateUser,
		state.logout,
	]);
	const [values, setValues] = useState<IUpdateUser>({
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

		const isNotEmpty = Object.values(values).some((val) => val);

		if (isNotEmpty) {
			updateUser(values);
		}
	};

	useEffect(() => {
		if (user) {
			setValues(user);
		}
	}, [user]);

	return (
		<form
			className={styles.form}
			onSubmit={onSubmit}
		>
			<div className={styles["input_list"]}>
				<div className={styles.group}>
					<input
						type="email"
						name="email"
						placeholder="Your email"
						value={values.email}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.group}>
					<input
						type="name"
						name="name"
						placeholder="Your name"
						value={values.name}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.group}>
					<input
						type="password"
						name="password"
						placeholder="Your password"
						value={values.password}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.group}>
					<input
						type="avatar"
						name="avatar"
						placeholder="Your avatar"
						value={values.avatar}
						onChange={handleChange}
					/>
				</div>
			</div>

			<div className={styles.buttons}>
				<button type="submit">Update user</button>
				<button onClick={logout}>Log out</button>
			</div>
		</form>
	);
};

export default ProfileForm;
