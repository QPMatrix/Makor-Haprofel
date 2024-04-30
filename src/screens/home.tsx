import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Box,
  Divider,
  NativeBaseProvider,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {Linking, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/footer';
import Header from '../components/header';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  return (
    <NativeBaseProvider>
      <Header title="קטיגרות אלומניום" />
      <ScrollView
        style={{
          paddingBottom: insets.bottom,
        }}>
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
