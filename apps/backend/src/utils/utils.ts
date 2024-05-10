import { UserDto } from "../dtos/user-dto";
import { IUserSchema } from "../models/user-model";

export const saveUserDto = async (user: IUserSchema) => {
	await user.save();
	const userDto = new UserDto(user);
	return userDto;
};
