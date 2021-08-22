import React, { useState } from 'react';
import { Button, Icon, Text, VStack } from 'native-base';
import { CardField, CardFieldInput } from '@stripe/stripe-react-native';
import { useAppDispatch, useAppSelector, useCheckSuccess } from 'src/hooks';
import { Header } from 'src/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonLayout } from 'src/constants/layout';
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
    <VStack bg="white" flex={1}>
      <Header
        title="Card Details"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
      />

      <VStack px={CommonLayout.containerX} py={CommonLayout.containerY}>
        <CardField
          onCardChange={(cardDetails) => setCard(cardDetails)}
          style={{ borderWidth: 1, width: '100%', height: 50, backgroundColor: 'white' }}
        />
        <Button
          bgColor="gray.900"
          disabled={!card?.complete}
          isLoading={isLoadingAddPaymentMethods}
          onPress={handleAddCard}
          mt={4}
        >
          <Text fontWeight="500" color="white">
            Add
          </Text>
        </Button>
      </VStack>
    </VStack>
  );
};

export default CollectCardDetailScreen;
