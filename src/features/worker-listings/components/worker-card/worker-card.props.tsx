export interface WorkerCardProps {
  avatar: string | undefined;
  name: string;
  age: number;
  ratings: string; // will be a string after toFixed(2)
  clockInTime: string | null;
  clockOutTime: string | null;
  onCardClick: () => void;
}
