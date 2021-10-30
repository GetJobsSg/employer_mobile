export interface TabOption {
  id: number;
  label: string;
}

export interface TabProps {
  options: TabOption[];
  selected: TabOption;
  onSelect: (option: TabOption) => void;
  align?: 'stretch' | 'stick';
}
