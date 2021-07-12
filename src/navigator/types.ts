import { RouteName } from './route';

export type RootStackParams = {
  [RouteName.AUTH_LOGIN]: undefined;
  [RouteName.AUTH_FORGET_PASSWORD]: undefined;

  [RouteName.JOB_LISTING]: undefined;

  [RouteName.PAYMENT_METHODS]: undefined;
  [RouteName.COLLECT_CARD_DETAILS]: undefined;
};