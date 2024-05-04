import { IUserSchema } from "../models/user-model";

export class UserDto {
	name: string;
	email: string;
	id: string;
	isActivated: boolean;

	constructor(model: IUserSchema) {
		this.name = model.name;
		this.email = model.email;
		this.id = model._id!;
		this.isActivated = model.isActivated;
	}
}
