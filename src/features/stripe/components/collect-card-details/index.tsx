import React from 'react';
import { Box } from 'native-base';
import {
  CardField,
  // createPaymentMethod, confirmSetupIntent
} from '@stripe/stripe-react-native';

const CollectCardDetailScreen = () => (
  <Box mx={4}>
    <CardField
      onCardChange={(cardDetails) => {
        console.log(cardDetails);
      }}
      style={{ borderWidth: 2, width: '100%', height: 50, backgroundColor: 'white' }}
    />
  </Box>
);

export default CollectCardDetailScreen;
