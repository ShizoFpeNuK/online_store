import styles from "./User.module.scss";
import { ChangeEventHandler, FC, useState } from "react";

interface IUserRefForm {
	closeForm: () => void;
}

type RegisterForm = {
	name: string;
	email: string;
	password: string;
	avatar: string;
};

const UserRegForm: FC<IUserRefForm> = ({ closeForm }) => {
	const [values, setValues] = useState<RegisterForm>({
		name: "",
		email: "",
		password: "",
		avatar: "",
	});

	const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.close} onClick={closeForm}>
				<svg className={styles["icon-fav"]}>
					<use href="/sprite.svg#close" />
				</svg>
			</div>

			<div className={styles.title}>Sign Up</div>

			<form className={styles.form}>
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

				<div className={styles.link}>I already have an account</div>

				<button
					type="submit"
					className={styles.submit}
				>
					Create an account
				</button>
			</form>
		</div>
	);
};

export default UserRegForm;
