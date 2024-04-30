import React from 'react';
import {
  Box,
  Text,
  Divider,
  HStack,
  IconButton,
  NativeBaseProvider,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Ionicons';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = ({title}: {title: string}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <>
      <Box paddingTop={insets.top} />
      <HStack
        px={1}
        py={3}
        justifyContent="space-around"
        alignContent="center"
        alignItems="center">
        <IconButton icon={<Icon name="shoppingcart" size={24} />} />
        <Text color="black" fontSize={20} fontWeight="bold">
          {title}
        </Text>
        {route.name !== 'Home' && (
          <IconButton
            pl={4}
            icon={<FIcon name="arrow-back" size={24} />}
            _icon={{color: 'black'}}
            onPress={() => navigation.goBack()}
          />
        )}
      </HStack>
      <Divider shadow={9} />
    </>
  );
};

export default Header;
