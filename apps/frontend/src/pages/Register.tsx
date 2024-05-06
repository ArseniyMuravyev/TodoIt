import { Button, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { EmailInput } from "../components/EmailInput";
import { FormValues, PasswordInput } from "../components/PasswordInput";
import {
	TRegisterData,
	register as registerUser,
} from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch } from "../store/store";
import { responsiveWidths } from "../styles";

const Register: FC = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [show, setShow] = useState(false);
	const { showSuccess, showError } = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		if (isSubmitting) {
			return;
		}
		try {
			dispatch(registerUser(data as TRegisterData))
				.unwrap()
				.then(() => showSuccess(t("user.activation")));
		} catch (error) {
			showError(t("user.unexpected_fail"));
		}
	};

	const onClick = () => setShow((prev) => !prev);

	return (
		<Flex justifyContent="center" alignContent="center" p="6">
			<VStack spacing="6" w="100%">
				<Heading as="h1">{t("user.registration")}</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack spacing="4" w={responsiveWidths}>
						<Input
							type="text"
							placeholder={t("user.name")}
							{...register("name", { required: "Поле  имени обязательно" })}
						/>
						{errors.name && <Text color="red.500">{errors.name.message}</Text>}
						<EmailInput register={register} errors={errors} />
						<PasswordInput
							register={register}
							show={show}
							onClick={onClick}
							errors={errors}
						/>
						<Button
							colorScheme="blue"
							type="submit"
							disabled={isSubmitting}
							w="full"
						>
							{isSubmitting ? t("user.submitting") : t("user.signUp")}
						</Button>
					</VStack>
				</form>
				<Flex mt="2" gap="2">
					{t("user.already_registered")}
					<Link to="/login">
						<Text color="blue.500">{t("user.login")}</Text>
					</Link>
				</Flex>
			</VStack>
		</Flex>
	);
};

export default Register;
