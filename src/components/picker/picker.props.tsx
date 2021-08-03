export type PickerOption = {
  label: string;
  value: string | number;
};

export interface PickerProps {
  onChange: (option: any) => void;
  options: PickerOption[];
  selectedValue: any;
}
