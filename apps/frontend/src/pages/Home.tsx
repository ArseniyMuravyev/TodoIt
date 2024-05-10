import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GetStarted } from "../components/home-page/GetStarted";
import { HomeButtons } from "../components/home-page/HomeButtons";
import { useSelector } from "../store/store";
import { Section } from "../styles";

const Home: FC = () => {
	const user = useSelector((state) => state.user.user);
	const { t } = useTranslation();

	return (
		<Section delay={0.2}>
			<Heading textAlign="center" as="h1">
				{t("home.title")}
			</Heading>
			{user ? <GetStarted /> : <HomeButtons />}
		</Section>
	);
};

export default Home;
