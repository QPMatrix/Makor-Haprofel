import React from 'react';
import {
  Box,
  Divider,
  NativeBaseProvider,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Footer from './footer';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './header';

const CategoryList = () => {
  const demo = [
    {
      title: '2 נתיבי ם & 2.5 נתיבי ם',
      type: 1,
    },
    {
      title: '3 נתיבי ם',
      type: 2,
    },
    {
      title: '1 נתיבים',
      type: 3,
    },
    {
      title: '2 נתיבים לחלון כיס',
      type: 4,
    },
    {
      title: "כנף-לזיגוג 3-6 מ' מ",
      type: 5,
    },
    {
      title: "כנף-לזיגוג 10-14 מ' מ",
      type: 6,
    },
    {
      title: 'כנף-תריס',
      type: 7,
    },
    {
      title: 'הלבשה',
      type: 8,
    },
  ];
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <Header title="קטיגוריות" />
      <ScrollView paddingTop={insets.top}>
        {demo &&
          demo.map((item, index) => (
            <Box key={index} borderRadius="md" borderColor="black" mt="2">
              <VStack space={4}>
                <TouchableOpacity
                  onPress={() =>
                    //@ts-ignore
                    navigation.navigate('ProductList', {
                      type: item.type,
                      title: item.title,
                    })
                  }>
                  <Box mt="2" alignSelf="center">
                    <Text bold fontSize="lg">
                      {item.title}
                    </Text>
                  </Box>
                </TouchableOpacity>
                <Divider color="black" mt="2" />
              </VStack>
            </Box>
          ))}
      </ScrollView>
      <Footer />
    </NativeBaseProvider>
  );
};

export default CategoryList;
