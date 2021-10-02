import { IAttendanceRecord, IWorkingDataRequestPayload } from '../../slice/types';

export interface IAttendanceModalProps {
  attendanceData: IAttendanceRecord;
  visible: boolean;
  isLoadingUpdate?: boolean;
  onClose: () => void;
  onOK: (data: IWorkingDataRequestPayload) => void;
}
