export interface ParticipantsCardProps {
  avatarUrl: string;
  name: string;
  age: number;
  gender: string;
  ratings: string;

  isSendingOffer?: boolean;
  onSendOffer?: () => void;

  isRejecting?: boolean;
  onReject?: () => void;
  onPhoneCall?: () => void;
  onWhatsapp?: () => void;
}
