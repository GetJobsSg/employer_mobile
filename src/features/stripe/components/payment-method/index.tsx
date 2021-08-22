import React, { useEffect } from 'react';
import { Button, Center, Heading, Icon, Spinner, Text, VStack } from 'native-base';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { RouteName } from 'src/navigator/route';
import { Header } from 'src/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonLayout } from 'src/constants/layout';
import { stripeActions } from '../../slice';
import { PaymentMethodScreenProps } from './types';

const PaymenMethodScreen = (props: PaymentMethodScreenProps) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const { defaultMethod, isLoadingPaymentMethods } = useAppSelector((state) => state.stripePayment);

  useEffect(() => {
    dispatch(stripeActions.getPaymentMethodRequest());
  }, [dispatch]);

  const hasDefaultMethod = !!defaultMethod.id;

  if (isLoadingPaymentMethods) {
    return (
      <Center safeArea bg="white" position="relative" h="100%" w="100%">
        <Spinner />
      </Center>
    );
  }

  return (
    <VStack bg="white" flex={1}>
      <Header
        title="Payment Method"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
      />

      <VStack px={CommonLayout.containerX} py={CommonLayout.containerY}>
        <VStack>
          {!hasDefaultMethod ? (
            <Heading size="sm" color="gray.400">
              You do not setup payment method
            </Heading>
          ) : (
            <VStack bg="white" shadow={2} p={3} borderRadius="lg" space={1}>
              <Text color="gray.500">{defaultMethod.brand}</Text>
              <Text fontSize="lg" fontWeight="bold">
                **** **** **** {defaultMethod.last4}
              </Text>
            </VStack>
          )}

          <Button bgColor="gray.900" onPress={() => navigation.push(RouteName.COLLECT_CARD_DETAILS)} mt={4}>
            {hasDefaultMethod ? (
              <Text fontWeight="500" color="white">
                Change Payment Method
              </Text>
            ) : (
              <Text fontWeight="500" color="white">
                Add Payment Method
              </Text>
            )}
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default PaymenMethodScreen;
