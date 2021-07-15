import React, { useState } from 'react';
import { Box, Button, Heading, VStack } from 'native-base';
import { CardField, CardFieldInput } from '@stripe/stripe-react-native';
import { useAppDispatch, useAppSelector, useCheckSuccess } from 'src/hooks';
import { stripeActions } from '../../slice';
import { CollectCardScreenProps } from './types';

const CollectCardDetailScreen = (props: CollectCardScreenProps) => {
  const { navigation } = props;
  const [card, setCard] = useState<CardFieldInput.Details>();

  const dispatch = useAppDispatch();
  const { error, isLoadingAddPaymentMethods } = useAppSelector((state) => state.stripePayment);

  // successfully addded card
  const successAddCard = useCheckSuccess({ loadingState: isLoadingAddPaymentMethods, error });
  if (successAddCard) navigation.goBack();

  const handleAddCard = async () => {
    dispatch(stripeActions.addPaymentMethodRequest());
  };

  return (
    <Box safeArea bg="white" position="relative" h="100%" w="100%">
      <VStack px={4}>
        <Heading py={4} size="md">
          Card Details
        </Heading>
        <CardField
          onCardChange={(cardDetails) => setCard(cardDetails)}
          style={{ borderWidth: 1, width: '100%', height: 50, backgroundColor: 'white' }}
        />
        <Button disabled={!card?.complete} isLoading={isLoadingAddPaymentMethods} onPress={handleAddCard} mt={4}>
          Add
        </Button>
      </VStack>
    </Box>
  );
};

export default CollectCardDetailScreen;
