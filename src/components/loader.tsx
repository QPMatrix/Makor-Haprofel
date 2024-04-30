import React from 'react';
import {Center, Image, Spinner, Text} from 'native-base';

const Loader = () => {
  return (
    <Center
      flex={1}
      justifyContent="center"
      alignContent="center"
      alignItems="center">
      <Image source={require('../assets/logo.png')} alt="logo" size="xl" />
      <Text fontWeight="medium" fontSize="lg">
        טוען...
      </Text>
      <Spinner size="lg" mt="4" />
    </Center>
  );
};

export default Loader;
