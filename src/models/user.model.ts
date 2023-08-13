export interface IUser {
	id: number;
	email: string;
	password: string;
	name: string;
	role: string;
	avatar: string;
}

export interface ICreateUser {
	email: string;
	password: string;
	name: string;
	avatar: string;
}

export interface ILoginUser {
	email: string;
	password: string;
}

export interface IToken {
	access_token: string;
	refresh_token: string;
}

export type IUpdateUser = ICreateUser;