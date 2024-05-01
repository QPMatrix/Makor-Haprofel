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
      <ProductList
        title={
          //@ts-ignore
          route.params.title
        }
        id={
          //@ts-ignore
          route.params.type
        }
      />
    </NativeBaseProvider>
  );
};

export default ProductScreen;
