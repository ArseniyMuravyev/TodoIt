import { Box } from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { Calendar } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'

interface IDatePicker {
  date: Date | null
  setDate: Dispatch<SetStateAction<Date | null>>
}
export const DatePicker: FC<IDatePicker> = ({ date, setDate }) => {
  return (
    <Box maxW="160" h="100%" position="relative">
      <SingleDatepicker name="date-input" date={date} onDateChange={setDate} />
      <Box position="absolute" bottom="2" right="2">
        <Calendar />
      </Box>
    </Box>
  )
}
