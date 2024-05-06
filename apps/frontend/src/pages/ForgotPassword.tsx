import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput } from "../components/EmailInput";
import { FormValues } from "../components/PasswordInput";
import { forgotPassword } from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch } from "../store/store";
import { responsiveWidths } from "../styles";

const ForgotPassword: FC = () => {
	const dispatch = useDispatch();
	const { showSuccess, showError } = useToast();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		if (isSubmitting) {
			return;
		}
		try {
			await dispatch(forgotPassword(data))
				.unwrap()
				.then(() => {
					localStorage.setItem("resetEmail", data.email);
					showSuccess(t("success.forgot"));
					navigate("/reset-password", { replace: true });
				});
		} catch (error) {
			showError(t("success.unexpected_fail"));
		}
	};

	return (
		<Flex justifyContent="center" alignItems="center" p="6">
			<VStack w="100%" spacing="6">
				<Heading as="h1">{t("user.password_recovery")}</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack spacing="4" w={responsiveWidths}>
						<EmailInput register={register} errors={errors} />
						<Button
							colorScheme="blue"
							type="submit"
							disabled={isSubmitting}
							w="full"
						>
							{isSubmitting ? t("user.submitting") : t("user.reset")}
						</Button>
					</VStack>
				</form>
				<Flex mt="2" gap="2">
					{t("user.remember_password")}
					<Link to="/login">
						<Text as="span" ml="2" color="blue.500">
							{t("user.login")}
						</Text>
					</Link>
				</Flex>
			</VStack>
		</Flex>
	);
};

export default ForgotPassword;
