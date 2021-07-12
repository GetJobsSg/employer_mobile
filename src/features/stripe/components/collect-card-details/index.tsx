import React, { useState } from 'react';
import { Box, Button } from 'native-base';
import { CardField, useStripe, CardFieldInput } from '@stripe/stripe-react-native';
import { getSetupIntentClientSecret } from '../../apis';

const CollectCardDetailScreen = () => {
  const [card, setCard] = useState<CardFieldInput.Details>();
  const { confirmSetupIntent } = useStripe();

  const handleAddCard = async () => {
    const { data: clientSecret } = await getSetupIntentClientSecret();
    try {
      const res = await confirmSetupIntent(clientSecret, {
        type: 'Card',
        billingDetails: {
          email: 'benson7667@gmail.com',
          phone: '90449045',
          name: 'TOH BAN SOON',
        },
      });
      console.log(card);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box safeArea px={4}>
      <CardField
        onCardChange={(cardDetails) => setCard(cardDetails)}
        style={{ borderWidth: 1, width: '100%', height: 50, backgroundColor: 'white' }}
      />
      <Button onPress={handleAddCard} mt={4}>
        Add Card
      </Button>
    </Box>
  );
};

export default CollectCardDetailScreen;
