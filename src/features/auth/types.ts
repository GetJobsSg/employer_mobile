import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteName } from 'src/navigator/route';
import { RootStackParams } from 'src/navigator/types';

// login screen props
export type LoginScreenRouteProps = RouteProp<RootStackParams, RouteName.AUTH_LOGIN>;
export type LoginScreenNavigateProps = StackNavigationProp<RootStackParams, RouteName.AUTH_LOGIN>;
export type LoginScreenProps = {
  route: LoginScreenRouteProps;
  navigation: LoginScreenNavigateProps;
};

// forget password screen props
export type ForgetPasswordScreenRouteProps = RouteProp<RootStackParams, RouteName.AUTH_FORGET_PASSWORD>;
export type ForgetPasswordScreenNavigateProps = StackNavigationProp<RootStackParams, RouteName.AUTH_FORGET_PASSWORD>;
export type ForgetPasswordScreenProps = {
  route: ForgetPasswordScreenRouteProps;
  navigation: LoginScreenNavigateProps;
};

export interface ILoginCredential {
  email: string;
  password: string;
}
