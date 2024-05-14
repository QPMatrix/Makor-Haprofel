import React, {useEffect, useState} from 'react';
import Header from './header';
import {getProductById} from '../services/product';
import Loader from './loader';
import {
  AddIcon,
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  IconButton,
  Image,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import {addToCart} from '../services/cart';
import {Platform} from 'react-native';

const Product = ({title, id}: {title: string; id: number}) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [color, setColor] = useState('');
  const toast = useToast();
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
  const handleAddingToCart = async () => {
    try {
      const res = await addToCart(data, color, quantity);
      if (res) {
        toast.show({variant: 'subtle', description: 'המוצר הוסף לסל'});
      } else {
        toast.show({variant: 'subtle', title: 'נא לנסה שוף'});
      }
    } catch (error) {}
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 64}
      style={{flex: 1}}>
      <Header title={title} />
      {data &&
        data.map((item, index) => (
          <ScrollView key={index}>
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
              <Divider my="4" />
              <VStack>
                <FormControl>
                  <FormControl.Label>נא להזין כמות</FormControl.Label>
                  <Input
                    onChangeText={value => setQuantity(value)}
                    value={quantity.toString()}
                    keyboardType="numeric"
                  />

                  <FormControl.Label>צבע</FormControl.Label>
                  <Input
                    onChangeText={value => setColor(value)}
                    value={color.toString()}
                    keyboardType="numeric"
                  />
                </FormControl>
              </VStack>
            </Box>

            <Button
              w="90%"
              m="auto"
              mt="10"
              variant="outline"
              onPress={() => handleAddingToCart()}
              leftIcon={<AddIcon />}>
              הוסיף להזמנה
            </Button>
          </ScrollView>
        ))}
    </KeyboardAvoidingView>
  );
};

export default Product;
