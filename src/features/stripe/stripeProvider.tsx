// import React from 'react';
// import { StripeProvider as Provider } from '@stripe/stripe-react-native';
// import { node } from 'prop-types';
// import config from 'src/config';
// import { useAppSelector } from 'src/hooks';

// interface Props {
//   children: React.ReactElement;
// }

// const StripeProvider = (props: Props) => {
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const { children } = props;

//   if (!isAuthenticated) return <>{children}</>;
//   return <Provider publishableKey={config.stripePublishableKey}>{children}</Provider>;
// };

// StripeProvider.propTypes = {
//   children: node,
// };

// export default StripeProvider;
export {};
