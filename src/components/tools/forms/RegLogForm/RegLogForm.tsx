import styles from "./RegLogForm.module.scss";
import { FC, FormEventHandler, ReactNode } from "react";

interface IRegLogForm {
	closeForm: () => void;
	clickLink: () => void;
	onSubmit: FormEventHandler<HTMLFormElement>;
	children: ReactNode;
	textLink: string;
	textSubmit: string;
	titleForm: string;
}

const RegLogForm: FC<IRegLogForm> = ({
	closeForm,
	clickLink,
	onSubmit,
	children,
	textLink,
	textSubmit,
	titleForm,
}) => {
	return (
		<div className={styles.wrapper}>
			<div
				className={styles.close}
				onClick={closeForm}
			>
				<svg className={styles["icon-fav"]}>
					<use href="/sprite.svg#close" />
				</svg>
			</div>

			<div className={styles.title}>{titleForm}</div>

			<form
				className={styles.form}
				onSubmit={onSubmit}
			>
				{children}

				<div
					className={styles.link}
					onClick={clickLink}
				>
					{textLink}
				</div>

				<button
					type="submit"
					className={styles.submit}
				>
					{textSubmit}
				</button>
			</form>
		</div>
	);
};

export default RegLogForm;
