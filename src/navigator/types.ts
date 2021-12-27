import { IJobActive, IJobCompleted, IJobOngoing } from 'src/features/job-listings/slice/types';
import { RouteName } from './route';

export type RootStackParams = {
  [RouteName.AUTH_LOGIN]: undefined;
  [RouteName.AUTH_FORGET_PASSWORD]: undefined;
  [RouteName.AUTH_CHANGE_PASSWORD]: undefined;

  [RouteName.PARTICIPANTS_LISTING]: { jobData: IJobActive };
  [RouteName.JOB_LISTING]: undefined;
  [RouteName.WORKER_LISTING]: { jobData: IJobOngoing };
  [RouteName.JOB_DETAILS]: { mode: 'create' | 'edit' | 'preview'; jobId?: number };
  [RouteName.ATTENDANCE_RECORD]: { jobData: IJobCompleted; jobStatus: 'ongoing' | 'completed' };

  [RouteName.PROFILE]: undefined;

  [RouteName.PAYMENT_METHODS]: undefined;
  [RouteName.COLLECT_CARD_DETAILS]: undefined;
  [RouteName.BILLING_ADDRESS]: undefined;

  [RouteName.TERMS_OF_USE]: undefined;
  [RouteName.PRIVACY_POLICY]: undefined;
};
