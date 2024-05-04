import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput } from "../components/EmailInput";
import { forgotPassword } from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch } from "../store/store";

interface IFormInput {
	email: string;
}

const ForgotPassword: FC = () => {
	const dispatch = useDispatch();
	const { showSuccess, showError } = useToast();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IFormInput>({});

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
		<Flex justifyContent="center" align="center" p="6">
			<VStack w="100%" spacing="6">
				<Heading as="h1" pb="6">
					{t("user.password_recovery")}
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack spacing="4" w="50vw">
						<EmailInput register={register} errors={errors} />
						<Button
							colorScheme="blue"
							size="md"
							type="submit"
							disabled={isSubmitting}
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
