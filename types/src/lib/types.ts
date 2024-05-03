export interface ITodo {
	_id: string;
	title: string;
	completed: boolean;
	date?: Date;
}

export interface TUser {
	id: string;
	email: string;
	name: string;
	accessToken?: string;
	refreshToken?: string;
	isActivated?: boolean;
}
