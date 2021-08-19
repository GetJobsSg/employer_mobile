export interface WorkerCardProps {
  avatar: string | undefined;
  name: string;
  age: number;
  ratings: number;
  clockInTime: string | null;
  clockOutTime: string | null;
  onCardClick: () => void;
}
