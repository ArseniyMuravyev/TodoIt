import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { responsivePadding } from "../styles";
import { GithubIcon } from "./GithubIcon";

export const Footer: FC = () => {
	return (
		<Box
			as="footer"
			position="fixed"
			bottom="0"
			left="0"
			w="100%"
			py="6"
			px={responsivePadding}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
		>
			<Text fontSize="xl" fontWeight="bold">
				Just TodoIt!
			</Text>
			<Link href="https://github.com/ArseniyMuravyev" isExternal>
				<Flex gap="2" alignItems="center">
					<GithubIcon />
					<Text>Github</Text>
				</Flex>
			</Link>
		</Box>
	);
};
