import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Box,
  Card,
  Center,
  Container,
  Divider,
  Heading,
  Link,
  NativeBaseProvider,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import {Linking, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/footer';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  return (
    <NativeBaseProvider>
      <Center paddingTop={insets.top} shadow="2">
        <Heading>קטגריות אלומניום</Heading>
        <Divider mt="2" />
      </Center>
      <ScrollView
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
          paddingLeft: insets.left,
        }}>
        <Spacer>
          <Box borderRadius="md" borderColor="black">
            <VStack space={4} divider={<Divider width="full" />}>
              <TouchableOpacity
                onPress={() => {
                  //@ts-ignore
                  navigate.navigate('CategoryDetails', {type: 1700});
                }}>
                <Box pt="4" alignSelf="center">
                  <Text bold fontSize="lg">
                    סדרה 1700
                  </Text>
                </Box>
              </TouchableOpacity>
              <Box alignSelf="center" pt="4">
                <Text bold fontSize="lg">
                  סדרה 7000
                </Text>
              </Box>
            </VStack>
          </Box>
        </Spacer>
      </ScrollView>
      <Divider mb="2" />
      <Box alignSelf="center" paddingBottom={insets.bottom}>
        <Text onPress={() => Linking.openURL('https://www.qpmatrix.tech')}>
          Powered by QPMatrix
        </Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
