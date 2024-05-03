import { Box, Button } from "@chakra-ui/react";
import { FC, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

interface IProfileButtos {
	handleCancel: (e: SyntheticEvent) => void;
}

export const ProfileButtos: FC<IProfileButtos> = ({ handleCancel }) => {
	const { t } = useTranslation();
	return (
		<>
			<Box>
				<Button variant="outline" onClick={handleCancel} mr="3">
					{t("user.cancel")}
				</Button>
				<Button variant="solid" type="submit">
					{t("user.save")}
				</Button>
			</Box>
		</>
	);
};
