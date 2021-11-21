export type PickerOption = {
  label: string;
  value: string | number;
};

export interface PickerProps {
  label: string;
  placeholder?: string;
  onChange: (option: any) => void;
  options: PickerOption[];
  selectedValue: any;
  isLoading?: boolean;
}
