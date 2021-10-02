import { IAttendanceRecord } from '../../slice/types';

export interface IAttendanceModalProps {
  attendanceData: IAttendanceRecord;
  visible: boolean;
  onClose?: () => void;
  onOK?: () => void;
}
