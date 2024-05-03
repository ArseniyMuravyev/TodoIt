import { Box } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Calendar } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

interface IDatePicker {
	date: Date | null;
	setDate: Dispatch<SetStateAction<Date | null>>;
}

export const DatePicker: FC<IDatePicker> = ({ date, setDate }) => {
	return (
		<Box maxW="140" h="100%" position="relative">
			<SingleDatepicker
				name="date-input"
				date={date || undefined}
				onDateChange={setDate}
				configs={{
					dateFormat: "dd.MM.yyyy",
				}}
			/>
			<Box position="absolute" bottom="2" right="2">
				<Calendar />
			</Box>
		</Box>
	);
};
