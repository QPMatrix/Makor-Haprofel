import React, {useEffect, useState} from 'react';
import Header from './header';
import {getProductById} from '../services/product';
import Loader from './loader';
import {
  AddIcon,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';

const Product = ({title, id}: {title: string; id: number}) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getProductById(id);
        if (res) {
          setData(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (isLoading || data.length === 0) {
    return <Loader />;
  }
  return (
    <>
      <Header title={title} />
      {data &&
        data.map((item, index) => (
          <View key={index}>
            <Box alignItems="center" width="90%" alignSelf="center">
              <Image
                source={{uri: item.image_url}}
                size="2xl"
                alt={item.name}
              />
            </Box>
            <Box width="90%" alignSelf="center" borderTopWidth={0}>
              <VStack space={4}>
                <HStack justifyContent="space-around">
                  <Text color="coolGray.800" bold>
                    מספר מקור הפרופילֿ:{item.mkbr}
                  </Text>
                  <Text color="coolGray.800" bold>
                    מספר קליל:{item.kbr}
                  </Text>
                </HStack>
                <HStack justifyContent="space-around">
                  <Text color="coolGray.800" bold>
                    Kg/m: {item.kgm}
                  </Text>
                  <Text color="coolGray.800" bold>
                    Kg/6M: {item.kg6m}
                  </Text>
                </HStack>
              </VStack>
            </Box>
            <Button
              w="90%"
              m="auto"
              mt="10"
              variant="outline"
              leftIcon={<AddIcon />}>
              הוסיף להזמנה
            </Button>
          </View>
        ))}
    </>
  );
};

export default Product;