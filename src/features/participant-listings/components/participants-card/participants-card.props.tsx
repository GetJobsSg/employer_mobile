export interface ParticipantsCardProps {
  avatarUrl: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  ratings: number;
  onSendOffer?: (userId: number) => void;
  onReject?: (userId: number) => void;
  onPhoneCall?: (phoneNumber: number) => void;
  onWhatsapp?: (phoneNumber: number) => void;
}
