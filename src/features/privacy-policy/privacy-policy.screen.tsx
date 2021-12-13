import React from 'react';
import { Icon, VStack } from 'native-base';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'src/components';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import PrivacyHtml from './privacy-policy.html';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  return (
    <VStack bg="white" flex={1}>
      <Header
        title="Privacy Policy"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
      />
      <WebView
        source={PrivacyHtml}
        press
        onNavigationStateChange={(event) => {
          if (!event.url.includes('privacy-policy.html')) {
            Linking.openURL(event.url);
          }
        }}
      />
    </VStack>
  );
};

export default PrivacyPolicyScreen;
