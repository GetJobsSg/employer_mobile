import { IJobActive } from 'src/features/job-listings/slice/types';
import { RouteName } from './route';

export type RootStackParams = {
  [RouteName.AUTH_LOGIN]: undefined;
  [RouteName.AUTH_FORGET_PASSWORD]: undefined;

  [RouteName.PARTICIPANTS_LISTING]: { jobData: IJobActive };
  [RouteName.JOB_LISTING]: undefined;
  [RouteName.WORKER_LISTING]: undefined;
  [RouteName.JOB_DETAILS]: { mode: 'create' | 'edit' | 'preview' };

  [RouteName.PROFILE]: undefined;

  [RouteName.PAYMENT_METHODS]: undefined;
  [RouteName.COLLECT_CARD_DETAILS]: undefined;
};
