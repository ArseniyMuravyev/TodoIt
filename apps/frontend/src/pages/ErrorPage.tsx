import { Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router-dom";

type ErrorResponse = {
	data: unknown;
	status: number;
	statusText: string;
	message?: string;
};

const ErrorPage = () => {
	const { t } = useTranslation();
	const error = useRouteError() as ErrorResponse;

	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			w="100%"
			h="100vh"
			gap="12"
		>
			<Heading>{t("home.error_title")}</Heading>
			<Text>{t("home.error_description")}</Text>
			<Text color="gray.600" as="i">
				{error.statusText}
			</Text>
		</Flex>
	);
};

export default ErrorPage;
