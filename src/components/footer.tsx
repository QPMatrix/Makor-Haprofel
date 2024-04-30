import React from 'react';
import {
  Box,
  Divider,
  HStack,
  Image,
  NativeBaseProvider,
  Text,
} from 'native-base';
import {I18nManager, Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Footer = () => {
  I18nManager.forceRTL(true);
  const insets = useSafeAreaInsets();
  return (
    <NativeBaseProvider>
      <HStack
        mt="10"
        alignItems="center"
        alignContent="center"
        flex={1}
        justifyContent="center"
        paddingBottom={insets.bottom + 4}>
        <Text onPress={() => Linking.openURL('https://www.qpmatrix.tech')}>
          Powered by QPMatrix
        </Text>
        <Image
          source={require('../assets/QPMatrix.png')}
          alt="logo"
          ml="2"
          size="sm"
        />
      </HStack>
    </NativeBaseProvider>
  );
};

export default Footer;
