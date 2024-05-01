import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
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
      <FlatList
        paddingTop={insets.top}
        data={data}
        renderItem={({item}) => (
          <Box
            borderBottomWidth="1"
            borderColor="muted.800"
            pl={['0', '4']}
            pr={['0', '5']}
            py="2">
            <TouchableOpacity>
              <HStack space={[2, 3]} justifyContent={'space-between'}>
                <Text color="coolGray.600" bold fontSize="lg">
                  {item.category_name}
                </Text>
                <Avatar size="48px" source={require('../assets/logo.png')} />
              </HStack>
            </TouchableOpacity>
          </Box>
        )}
      />
    </>
  );
};

export default CategoryList;
