import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Loader from './loader';
import Header from './header';
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {getProducts} from '../services/product';
const defaultImage = require('../assets/logo.png');
const ProductList = ({title, id}: {title: string; id: number}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      const res = await getProducts(id);
      if (res) {
        setData(res);
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [id]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Header title={title} />
      <FlatList
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 5,
          paddingRight: insets.right,
          paddingLeft: insets.left,
        }}
        data={data}
        renderItem={({item}) => (
          <Box
            borderBottomWidth="1"
            borderColor="muted.50"
            pl={['0', '4']}
            paddingLeft="2"
            px="4"
            pr={['0', '5']}
            py="4">
            <TouchableOpacity
              onPress={() =>
                //@ts-ignore
                navigation.navigate('Product', {title: item.name, id: item.id})
              }>
              <HStack
                space={[2, 3]}
                justifyContent="space-around"
                alignItems="center">
                <Image
                  size="sm"
                  alt="product image"
                  source={{
                    uri: item.image_url,
                  }}
                />

                <VStack>
                  <Text color="coolGray.800" bold ml="2">
                    {item.name}
                  </Text>
                  <Text color="coolGray.600" ml="2" textAlign="right">
                    מספר מקור הפרופיל: {item.mkbr}
                  </Text>
                  <Text color="coolGray.600" ml="2" textAlign="right">
                    מספר קליל: {item.kbr}
                  </Text>
                </VStack>
              </HStack>
            </TouchableOpacity>
          </Box>
        )}
      />
    </>
  );
};

export default ProductList;
