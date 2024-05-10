import { Button, Flex } from "@chakra-ui/react";
import { FC, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

interface IProfileButtos {
	handleCancel: (e: SyntheticEvent) => void;
}

export const ProfileButtos: FC<IProfileButtos> = ({ handleCancel }) => {
	const { t } = useTranslation();
	return (
		<Flex gap="4">
			<Button variant="outline" onClick={handleCancel} mr="3" w="32">
				{t("user.cancel")}
			</Button>
			<Button variant="solid" type="submit" w="32">
				{t("user.save")}
			</Button>
		</Flex>
	);
};
