import React, {useEffect, useState} from 'react';
import {Avatar, Box, FlatList, HStack, Text} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './header';
import {getCategory} from '../services/category';
import Loader from './loader';
import {View} from 'react-native';
import Footer from './footer';

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
            borderColor="muted.800"
            safeAreaBottom
            paddingBottom={insets.bottom}
            pl={['0', '4']}
            pr={['0', '5']}
            px="5"
            py="2">
            <TouchableOpacity
              onPress={() =>
                //@ts-ignore
                navigation.navigate('Products', {
                  title: item.category_name,
                  type: item.id,
                })
              }>
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
