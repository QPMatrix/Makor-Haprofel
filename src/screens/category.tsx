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

const CategoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <CategoryList />
    </NativeBaseProvider>
  );
};

export default CategoryScreen;
