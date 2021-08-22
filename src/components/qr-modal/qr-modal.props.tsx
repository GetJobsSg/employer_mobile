export interface QRModalProps {
  visible: boolean;
  qrClockInValue: string | null;
  qrClockOutValue: string | null;
  onCancel?: () => void;
  onOK?: () => void;
}
