import { Input } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

interface IFormInput {
	type: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	placeholder: string;
	name: string;
}

export const FormInput: FC<IFormInput> = ({
	type,
	placeholder,
	name,
	onChange,
	value,
}) => {
	return (
		<Input
			isRequired
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			name={name}
			w="50vw"
		/>
	);
};
