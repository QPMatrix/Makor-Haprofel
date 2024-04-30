import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Box,
  Center,
  Divider,
  Heading,
  NativeBaseProvider,
  HStack,
  IconButton,
  Text,
} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryList from '../components/catgeory-list';

const CategoryDetails = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <Box safeAreaTop />
      <HStack px={1} py={3} justifyContent="space-between" alignItems="center">
        <Text color="black" fontSize={20} fontWeight="bold">
          {
            //@ts-ignore
            route.params?.type
          }
        </Text>
        <IconButton
          icon={<Icon name="arrow-left" size={20} />}
          _icon={{color: 'black'}}
          onPress={() => navigation.goBack()}
        />
      </HStack>
      <Divider mt="2" />
      <CategoryList />
    </NativeBaseProvider>
  );
};

export default CategoryDetails;
