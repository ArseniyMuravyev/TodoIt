import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import { EmailInput } from "../components/EmailInput";
import { FormValues, PasswordInput } from "../components/PasswordInput";
import { login } from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch, useSelector } from "../store/store";
import { desktopDisplay, responsiveWidths } from "../styles";

const Login: FC = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const { showError, showSuccess } = useToast();
	const { t } = useTranslation();
	const [show, setShow] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		if (isSubmitting) {
			return;
		}
		if (!data.email || !data.password) {
			showError(t("error.empty"));
			return;
		}
		try {
			await dispatch(login(data))
				.unwrap()
				.then(() => showSuccess(t("success.success")));
		} catch (error) {
			showError(t("user.login_failed"));
		}
	};

	if (isAuthenticated) {
		return <Navigate to={"/"} />;
	}

	const onClick = () => setShow((prev) => !prev);

	return (
		<Flex justifyContent="center" alignItems="center" p="6">
			<VStack spacing="6" w="100%">
				<Heading as="h1">{t("user.entrance")}</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack spacing="4" w={responsiveWidths}>
						<EmailInput register={register} errors={errors} />
						<PasswordInput
							show={show}
							onClick={onClick}
							register={register}
							errors={errors}
						/>

						<Button
							colorScheme="blue"
							w="full"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? t("user.submitting") : t("user.login")}
						</Button>
					</VStack>
				</form>
				<Flex
					mt="2"
					justifyContent="center"
					alignItems="center"
					gap={{ base: "8", md: "2" }}
					flexDirection={{ base: "row", md: "column" }}
				>
					<Flex gap="2">
						<Text display={desktopDisplay}>{t("user.new_user")}</Text>
						<Link to="/register">
							<Text color="blue.500">{t("user.signUp")}</Text>
						</Link>
					</Flex>
					<Flex gap="2">
						<Text display={desktopDisplay}>{t("user.forgot_password")}</Text>
						<Link to="/forgot-password">
							<Text color="blue.500">{t("user.reset_password")}</Text>
						</Link>
					</Flex>
				</Flex>
			</VStack>
		</Flex>
	);
};

export default Login;
