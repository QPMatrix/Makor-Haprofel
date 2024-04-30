import React from 'react';
import {
  Box,
  Divider,
  HStack,
  Image,
  NativeBaseProvider,
  Text,
} from 'native-base';
import {Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Footer = () => {
  const insets = useSafeAreaInsets();
  return (
    <NativeBaseProvider>
      <HStack
        alignItems="center"
        alignContent="center"
        flex={1}
        justifyContent="center">
        <Text onPress={() => Linking.openURL('https://www.qpmatrix.tech')}>
          Powered by QPMatrix
        </Text>
        <Image
          onProgress={() => Linking.openURL('https://www.qpmatrix.tech')}
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
