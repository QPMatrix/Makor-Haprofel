import {View, Text} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import Product from '../components/product';

const ProductInfoScreen = () => {
  const route = useRoute();
  return (
    <NativeBaseProvider>
      <Product
        title={
          //@ts-ignore
          route.params.title
        }
        id={
          //@ts-ignore
          route.params.id
        }
      />
    </NativeBaseProvider>
  );
};

export default ProductInfoScreen;
