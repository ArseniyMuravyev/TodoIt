import { useToast as useChakraToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const useToast = () => {
	const toast = useChakraToast();
	const { t } = useTranslation();

	const showSuccess = (description: string) => {
		toast({
			title: t("success.success"),
			description,
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	};

	const showError = (description: string) => {
		toast({
			title: t("error.error"),
			description,
			status: "error",
			duration: 5000,
			isClosable: true,
		});
	};

	return { showSuccess, showError };
};
