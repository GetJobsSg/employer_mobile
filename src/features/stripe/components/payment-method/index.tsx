import React, { useEffect } from 'react';
import { Box, Button, Heading, Text, VStack } from 'native-base';
import { useAppDispatch } from 'src/hooks';
import { stripeActions } from '../../slice';

const PaymenMethodScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(stripeActions.getPaymentMethodRequest());
  }, [dispatch]);

  return (
    <Box safeArea bg="white" position="relative" h="100%" w="100%">
      <Heading px={4} py={4} size="md">
        Payment Method
      </Heading>

      <VStack px={4}>
        <VStack>
          {/* <Text fontSize="sm" mb={2}>
                Default Payment
              </Text> */}
          <VStack bg="white" shadow={2} p={3} borderRadius="lg" space={1}>
            <Text color="gray.500">Visa</Text>
            <Text fontSize="lg" fontWeight="bold">
              **** **** **** 5520
            </Text>
          </VStack>

          {/* <Heading size="sm" color="gray.400">
                You have not setup payment method
              </Heading> */}

          <Button mt={4}>Add Payment Methods</Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PaymenMethodScreen;
