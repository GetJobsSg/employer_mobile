import React from 'react';
import { Icon, VStack } from 'native-base';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'src/components';
import { useNavigation } from '@react-navigation/native';

const TermsOfUseScreen = () => {
  const navigation = useNavigation();
  return (
    <VStack bg="white" flex={1}>
      <Header
        title="Terms of Use"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
      />
      <WebView source={{ uri: 'https://www.getjobsfor.me/terms' }} />
    </VStack>
  );
};

export default TermsOfUseScreen;
