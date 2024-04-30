import {Box, Heading, ScrollView, Stack, Text, Skeleton} from 'native-base';
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
        console.log(res);
        setData(res);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <ScrollView
      paddingTop={insets.top}
      paddingRight={insets.right}
      paddingLeft={insets.left}
      paddingBottom={insets.bottom}>
      <Box alignItems="center">
        {isLoading ? (
          <Skeleton
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
              onPress={() =>
                //@ts-ignore
                navigate.navigate('Category', {
                  title: item.type_name,
                  type: item.type_id,
                })
              }
              style={{
                width: '90%',
                alignItems: 'flex-start',
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Box
                w="full"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                alignContent="flex-start"
                flex={1}
                textAlign={'right'}
                alignItems={'flex-start'}
                borderWidth="1">
                <Stack space={2}>
                  <Heading fontSize="5xl">
                    <Text>{item.type_name}</Text>
                  </Heading>
                </Stack>
              </Box>
            </TouchableOpacity>
          ))
        )}
      </Box>
    </ScrollView>
  );
};

export default AluminumType;
