import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, Text, VStack, Icon } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { ErrorHandlerProps } from './error-handler.props';
import { errorHandlerActions } from './slices';

// FOR FUN: convert this into a snackbar with custom hook capibility
// const { showError, showSuccess, showWarning } =  useSnackbar({ message: "abc def....", autoDismiss: true })

const ErrorHandler = (props: ErrorHandlerProps) => {
  const { children } = props;
  const { bottom } = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const { isShow, message } = useAppSelector((state) => state.errors);

  const handleClose = () => dispatch(errorHandlerActions.hideError());

  return (
    <VStack flex={1}>
      {children}
      {isShow && (
        <Alert status="error" px={4} pt={4} pb={bottom + 4} justifyContent="space-between" alignItems="flex-start">
          <Text fontSize="sm">{message}</Text>
          <Icon onPress={handleClose} as={Ionicons} name="close-outline" color="gray.500" size={5} />
        </Alert>
      )}
    </VStack>
  );
};

export default ErrorHandler;
