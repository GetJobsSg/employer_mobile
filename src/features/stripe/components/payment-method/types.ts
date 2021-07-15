import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteName } from 'src/navigator/route';
import { RootStackParams } from 'src/navigator/types';

// login screen props
export type PaymentMethodScreenRouteProps = RouteProp<RootStackParams, RouteName.PAYMENT_METHODS>;
export type PaymentMethodScreenNavigateProps = StackNavigationProp<RootStackParams, RouteName.PAYMENT_METHODS>;
export type PaymentMethodScreenProps = {
  route: PaymentMethodScreenRouteProps;
  navigation: PaymentMethodScreenNavigateProps;
};
