export interface ParticipantsCardProps {
  avatarUrl: string;
  name: string;
  age: number;
  gender: string;
  ratings: string;

  isSendingOffer?: boolean;
  onSendOffer?: () => void;
  onReject?: (userId: number) => void;
  onPhoneCall?: (phoneNumber: number) => void;
  onWhatsapp?: (phoneNumber: number) => void;
}
