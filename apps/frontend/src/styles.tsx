import {
	ResponsiveValue,
	chakra,
	extendTheme,
	shouldForwardProp,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const theme = extendTheme({
	colors: {
		brand: {
			100: "#f7fafc",
			900: "#1a202c",
		},
	},
	styles: {
		global: {
			body: {
				fontSize: { base: "sm", md: "md" },
			},
			h1: {
				fontSize: { base: "lg", md: "xl" },
			},
		},
	},
});

export const responsiveWidths = {
	base: "80vw",
	md: "50vw",
};

export const buttonSize = {
	base: "full",
	md: "10",
};

export const responsiveDirection:
	| ResponsiveValue<"column" | "column-reverse" | "row">
	| undefined = {
	base: "column",
	md: "row",
};

export const desktopDisplay = { base: "none", lg: "flex" };

export const mobileDisplay = { base: "flex", lg: "none" };

export const responsivePadding = { base: "4", md: "12" };

const StyledDiv = chakra(motion.div, {
	shouldForwardProp: (prop) => {
		return shouldForwardProp(prop) || prop === "transition";
	},
});

export const Section = ({
	children,
	delay = 0,
}: {
	children: ReactNode;
	delay: number;
}) => (
	<StyledDiv
		initial={{ y: 10, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		mb="6"
	>
		{children}
	</StyledDiv>
);
