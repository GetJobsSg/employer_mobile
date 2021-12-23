import { DD_MMM_YYYY, DD_MMM, HH_MM_A } from 'src/constants/dateTime';

type FormatType = typeof DD_MMM_YYYY | typeof DD_MMM | typeof HH_MM_A;

export interface DatePickerProps {
  disabled?: boolean;
  label: string;
  placeholder?: string;
  selectedDate: Date | undefined;
  onChange: (date: Date) => void;
  format?: FormatType;
  mode?: 'date' | 'time' | 'datetime'; // take from library
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30; // take from library
  maximumDate?: Date; // take from library
  minimumDate?: Date; // take from library
}
