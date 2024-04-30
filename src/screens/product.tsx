import React from 'react';
import {
  Box,
  Text,
  Divider,
  HStack,
  IconButton,
  NativeBaseProvider,
} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import ProductList from '../components/product-list';

const ProductScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <NativeBaseProvider>
      <Box safeAreaTop />
      <HStack px={1} py={3} justifyContent="space-between" alignItems="center">
        <Text color="black" fontSize={20} fontWeight="bold">
          {
            //@ts-ignore
            route.params?.title
          }
        </Text>
        <IconButton
          icon={<Icon name="arrow-left" size={20} />}
          _icon={{color: 'black'}}
          onPress={() => navigation.goBack()}
        />
      </HStack>
      <Divider mt="2" />
      <ProductList />
    </NativeBaseProvider>
  );
};

export default ProductScreen;
