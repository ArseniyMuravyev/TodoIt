import { Input, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IEmailInput {
	register: any;
	errors: any;
}

export const EmailInput: FC<IEmailInput> = ({ register, errors }) => {
	const { t } = useTranslation();
	return (
		<>
			<Input
				type="email"
				placeholder="Email"
				{...register("email", {
					required: t("user.email_required"),
					validate: (value: string) => {
						if (!value.includes("@")) {
							return t("user.incorrect_email");
						}
					},
				})}
			/>
			{errors.email && <Text color="red.500">{errors.email.message}</Text>}
		</>
	);
};
