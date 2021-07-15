import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteName } from 'src/navigator/route';
import { RootStackParams } from 'src/navigator/types';

// login screen props
export type CollectCardScreenRouteProps = RouteProp<RootStackParams, RouteName.COLLECT_CARD_DETAILS>;
export type CollectCardScreenNavigateProps = StackNavigationProp<RootStackParams, RouteName.COLLECT_CARD_DETAILS>;
export type CollectCardScreenProps = {
  route: CollectCardScreenRouteProps;
  navigation: CollectCardScreenNavigateProps;
};
