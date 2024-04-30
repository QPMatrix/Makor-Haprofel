import React from 'react';
import {Box, Divider, NativeBaseProvider, Text} from 'native-base';
import {Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Footer = () => {
  const insets = useSafeAreaInsets();
  return (
    <NativeBaseProvider>
      <Divider mb="2" />
      <Box alignSelf="center" paddingBottom={insets.bottom}>
        <Text onPress={() => Linking.openURL('https://www.qpmatrix.tech')}>
          Powered by QPMatrix
        </Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default Footer;
