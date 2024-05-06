import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { DOTS, usePagination } from "../hooks/usePagination";

export interface PaginationProps {
	onPageChange: (currentPage: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
}

export const Pagination: FC<PaginationProps> = ({
	onPageChange,
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
}) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	const lastPage = paginationRange?.[paginationRange.length - 1];

	return (
		<Flex
			align="center"
			mt="4"
			position="fixed"
			bottom="10%"
			left="50%"
			transform="translate(-50%, -50%)"
		>
			<Button onClick={onPrevious} disabled={currentPage === 1} mx={1} w="8">
				<Text fontSize="xl" textAlign="center">
					&lsaquo;
				</Text>
			</Button>
			{paginationRange?.map((pageNumber) => {
				if (pageNumber === DOTS) {
					return (
						<Box key={pageNumber} mx={1} as="span">
							&#8230;
						</Box>
					);
				}

				return (
					<Button
						key={pageNumber}
						onClick={() => onPageChange(Number(pageNumber))}
						variant={pageNumber === currentPage ? "solid" : "ghost"}
						mx={1}
					>
						{pageNumber}
					</Button>
				);
			})}
			<Button
				onClick={onNext}
				disabled={currentPage === lastPage}
				mx={1}
				w="8"
				fontSize="xl"
			>
				<Text fontSize="xl" textAlign="center">
					&rsaquo;
				</Text>
			</Button>
		</Flex>
	);
};
