import {
  Box,
  Heading,
  ScrollView,
  Stack,
  Text,
  Skeleton,
  FlatList,
  HStack,
  Avatar,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {I18nManager, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getType} from '../services/type';
import {useNavigation} from '@react-navigation/native';

const AluminumType = () => {
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();
  I18nManager.forceRTL(true);
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getType();
      if (res) {
        setData(res);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box safeAreaTop>
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
            <TouchableOpacity
              onPress={() =>
                //@ts-ignore
                navigate.navigate('Category', {
                  title: item.type_name,
                  type: item.id,
                })
              }>
              <HStack
                space={[2, 3]}
                justifyContent={'space-between'}
                alignItems="center">
                <Text color="coolGray.600" bold fontSize="xl">
                  {item.type_name}
                </Text>
                <Avatar size="48px" source={require('../assets/logo.png')} />
              </HStack>
            </TouchableOpacity>
          </Box>
        )}
      />
    </Box>
  );
};

export default AluminumType;
