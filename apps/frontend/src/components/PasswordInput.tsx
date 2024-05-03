import { Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import { FormInput } from "./FormInput";

interface IPasswordInput {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	onClick: () => void;
	show: boolean;
}

export const PasswordInput: FC<IPasswordInput> = ({
	onChange,
	value,
	onClick,
	show,
}) => {
	const { t } = useTranslation();

	return (
		<InputGroup>
			<FormInput
				onChange={onChange}
				value={value}
				name="password"
				type={show ? "text" : "password"}
				placeholder={t("user.password")}
			/>
			<InputRightElement w="4.5rem">
				<Button h="1.75rem" size="sm" onClick={onClick}>
					{show ? "Hide" : "Show"}
				</Button>
			</InputRightElement>
		</InputGroup>
	);
};
