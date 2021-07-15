import React, { useEffect } from 'react';
import { Box, Button, Center, Heading, Spinner, Text, VStack } from 'native-base';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { RouteName } from 'src/navigator/route';
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
    <Box safeArea bg="white" position="relative" h="100%" w="100%">
      <Heading px={4} py={4} size="md">
        Payment Method
      </Heading>

      <VStack px={4}>
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

          <Button onPress={() => navigation.push(RouteName.COLLECT_CARD_DETAILS)} mt={4}>
            {hasDefaultMethod ? 'Change Payment Method' : 'Add Payment Method'}
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PaymenMethodScreen;
