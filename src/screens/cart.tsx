import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  DeleteIcon,
  MinusIcon,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  Text,
  VStack,
  Center,
  Flex,
  Spacer,
  AspectRatio,
  Badge,
  Divider,
} from 'native-base';
import Header from '../components/header';
import {getCart, removeItemFromCart} from '../services/cart';
import {useNavigation} from '@react-navigation/native';
import Loader from '../components/loader';

const CartScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getCart();
      if (res) {
        setData(res);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (id: number) => {
    try {
      await removeItemFromCart(id);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <NativeBaseProvider>
      <Header title="הזמנה" />
      <ScrollView>
        {data && data.length > 0 ? (
          <VStack space={4} alignItems="center">
            {data.map((item: any, index) => (
              <Box
                key={index}
                alignSelf="center"
                bgColor="coolGray.300"
                width="100%">
                <HStack space={2} alignItems="center">
                  <AspectRatio ratio={1} width={20}>
                    <Image
                      source={{uri: item.image_url}}
                      alt="image base"
                      resizeMode="contain"
                    />
                  </AspectRatio>
                  <Text>{item.name}</Text>
                </HStack>
                <HStack
                  space={4}
                  justifyContent={'space-around'}
                  alignItems="center">
                  <Text>מספר מקור הפרופיל: {item.mkbr}</Text>
                  <Text>מספר קליל: {item.kbr}</Text>
                </HStack>
                <HStack
                  space={4}
                  marginTop="2"
                  justifyContent={'space-around'}
                  alignItems={'center'}>
                  <Text>KGM: {item.kgm}</Text>
                  <Text>KG6M: {item.kg6m}</Text>
                </HStack>
                <Text
                  flex="1"
                  alignItems="center"
                  justifyContent="center"
                  margin="auto">
                  כמות:{item.quantity}
                </Text>
                <Center alignItems="center" marginTop="4">
                  <Button
                    leftIcon={<MinusIcon size="sm" />}
                    onPress={() => handleDelete(item.id)}
                    size="sm"
                    colorScheme="danger"
                    variant="outline">
                    מחיקה
                  </Button>
                </Center>
              </Box>
            ))}
            <Box width="100%" height="300px" bottom="0" flex={'1'}>
              <Button
                colorScheme="success"
                borderRadius="full"
                onPress={() =>
                  //@ts-ignore
                  navigation.navigate('Pdf')
                }>
                הוציא הזמנה
              </Button>
            </Box>
          </VStack>
        ) : (
          <Center flex={1}>
            <Text>לא נמצא נותנים</Text>
          </Center>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default CartScreen;
