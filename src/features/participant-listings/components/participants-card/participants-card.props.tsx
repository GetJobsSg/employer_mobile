export interface ParticipantsCardProps {
  avatarUrl: string;
  name: string;
  age: string;
  gender: string;
  ratings: string;
  onSendOffer?: (userId: number) => void;
  onReject?: (userId: number) => void;
  onPhoneCall?: (phoneNumber: number) => void;
  onWhatsapp?: (phoneNumber: number) => void;
}
