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
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryList from '../components/catgeory-list';
import Header from '../components/header';
import Footer from '../components/footer';

const CategoryScreen = () => {
  const route = useRoute();
  return (
    <NativeBaseProvider>
      <CategoryList
        title={
          //@ts-ignore

          route.params?.title
        }
        id={
          //@ts-ignore
          route.params?.type
        }
      />
    </NativeBaseProvider>
  );
};

export default CategoryScreen;
