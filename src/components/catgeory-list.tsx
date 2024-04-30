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

const CategoryList = () => {
  const demo = [
    {
      title: '2 נתיבי ם & 2.5 נתיבי ם',
      type: 1700,
    },
    {
      title: '3 נתיבי ם',
      type: 1700,
    },
    {
      title: '1 נתיבים',
      type: 1700,
    },
    {
      title: '2 נתיבים לחלון כיס',
      type: 1700,
    },
    {
      title: "כנף-לזיגוג 3-6 מ' מ",
      type: 1700,
    },
    {
      title: "כנף-לזיגוג 10-14 מ' מ",
      type: 1700,
    },
    {
      title: 'כנף-תריס',
      type: 1700,
    },
    {
      title: 'הלבשה',
      type: 1700,
    },
  ];
  const insets = useSafeAreaInsets();
  return (
    <NativeBaseProvider>
      <ScrollView paddingTop={insets.top}>
        {demo &&
          demo.map((item, index) => (
            <Box key={index} borderRadius="md" borderColor="black" mt="2">
              <VStack space={4}>
                <Box mt="2" alignSelf="center">
                  <Text bold fontSize="lg">
                    {item.title}
                  </Text>
                </Box>
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
