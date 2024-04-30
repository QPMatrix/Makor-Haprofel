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
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = ({title}: {title: string}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <>
      <Box paddingTop={insets.top} />
      <HStack px={1} py={3} justifyContent="space-between">
        <Text color="black" fontSize={20} fontWeight="bold">
          {title}
        </Text>
        {route.name !== 'Home' && (
          <IconButton
            pl={4}
            icon={<Icon name="arrow-left" size={20} />}
            _icon={{color: 'black'}}
            onPress={() => navigation.goBack()}
          />
        )}
      </HStack>
      <Divider />
    </>
  );
};

export default Header;
