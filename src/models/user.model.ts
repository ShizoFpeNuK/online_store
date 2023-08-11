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
