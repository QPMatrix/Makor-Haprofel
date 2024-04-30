import React, {useEffect, useState} from 'react';
import {
  Box,
  Divider,
  Heading,
  NativeBaseProvider,
  ScrollView,
  Skeleton,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Footer from './footer';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './header';
import {getCategory} from '../services/category';
import Loader from './loader';

const CategoryList = ({title, id}: {title: string; id: number}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      const res = await getCategory(id);
      if (res) {
        setData(res);
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [id]);
  console.log(data);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Header title={title} />
      <ScrollView paddingTop={insets.top}>
        <Box alignItems="center">
          {isLoading ? (
            <Skeleton.Text
              variant="rect"
              height={20}
              width="90%"
              startColor="pink.500"
              endColor="orange.500"
            />
          ) : (
            Array.isArray(data) &&
            data.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {}}
                style={{
                  width: '90%',
                }}>
                <Box
                  w="full"
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  alignContent="center"
                  flex={1}
                  textAlign={'right'}
                  alignItems={'center'}
                  mt={4}
                  borderWidth="2">
                  <Stack space={4}>
                    <Heading fontSize="2xl">
                      <Text>{item.category_name}</Text>
                    </Heading>
                  </Stack>
                </Box>
              </TouchableOpacity>
            ))
          )}
        </Box>
      </ScrollView>
      <Footer />
    </>
  );
};

export default CategoryList;
